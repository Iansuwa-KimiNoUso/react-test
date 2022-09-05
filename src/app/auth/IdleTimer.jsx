import React, { useState, useEffect } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import SCModal from 'app/components/SCModal/SCModal'
import useAuth from 'app/hooks/useAuth'
import useTranslation from 'app/hooks/translations'
import jwtDecode from 'jwt-decode'
import ExpiryToMilliseconds from 'app/auth/ExpiryToMilliseconds'

let expirationTimeout

const IdleTimer = ({ children }) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [mode, setMode] = useState('')
    let expiresIn = sessionStorage.getItem('expire_at')

    const translation = useTranslation()
    const { title, content, cancel, ok } =
        mode === 'idle'
            ? translation.auth.modal.idle
            : translation.auth.modal.expired

    const { logout, refresh } = useAuth()

    const handleOnIdle = (event) => {
        if (mode !== 'expired') {
            setMode('idle')
            setOpenDialog(true)
        }
        console.log('Last Active Time', getLastActiveTime)
        console.log('Remaining Time', getRemainingTime)
    }

    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: expiresIn,
        onIdle: handleOnIdle,
        onActive: () => {},
        onAction: () => {},
        debounce: 100,
    })

    const handleLogout = () => {
        logout()
    }

    const handleContinueSession = async () => {
        const data = await refresh()
        setOpenDialog(false)
        clearTimeout(expirationTimeout)
        if (data) {
            let accessToken = data.access_token
            let decodedAccessToken = jwtDecode(accessToken)
            sessionStorage.setItem('accessToken', accessToken)
            sessionStorage.setItem(
                'expire_at',
                ExpiryToMilliseconds(decodedAccessToken.exp)
            )
            setTimeout(() => {
                setMode('')
                window.location.reload()
            }, 300)
        }
    }

    const handleLoginAgain = () => {
        window.location.reload()
    }

    const startExpiration = () => {
        expirationTimeout = setTimeout(() => {
            setOpenDialog(false)
            setTimeout(() => {
                setMode('expired')
            }, 300)
        }, expiresIn)
    }

    const showExpiration = () => {
        setOpenDialog(true)
        clearSession()
    }

    const clearSession = () => {
        sessionStorage.clear()
    }

    useEffect(() => {
        if (mode === 'idle') {
            startExpiration()
        }

        if (mode === 'expired') {
            showExpiration()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, expiresIn])

    // useEffect(() => {
    window.addEventListener('storage', () => {
        expiresIn = sessionStorage.getItem('expire_at')
    })
    // }, [expiresIn])

    return (
        <>
            {children}
            <SCModal
                handleCancel={handleLogout}
                handleOk={
                    mode === 'idle' ? handleContinueSession : handleLoginAgain
                }
                openDialog={openDialog}
                title={title}
                content={content}
                cancel={cancel}
                ok={ok}
                cancelWidth={170}
                okWidth={170}
            />
        </>
    )
}

export default IdleTimer
