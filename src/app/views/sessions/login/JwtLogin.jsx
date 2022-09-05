import React from 'react'
import history from 'history.js'
import jwtDecode from 'jwt-decode'
import useAuth from 'app/hooks/useAuth'

const JwtLogin = () => {
    const { login } = useAuth()

    const expMinusCurrentTimestamp = (exp) => {
        var currentTimestamp = new Date().getTime()
        var ct = currentTimestamp / 1000
        var expSeconds = exp - ct
        var expMilliseconds = expSeconds * 1000
        return expMilliseconds
    }

    let url = new URL(window.location.href)
    let c = url.searchParams.get('c')
    sessionStorage.clear()

    if (c !== null) {
        const decodedJWT = jwtDecode(c)
        let accessToken = decodedJWT.access_token
        let decodedAccessToken = jwtDecode(accessToken)
        sessionStorage.setItem(
            'expire_at',
            window.location.hostname === 'localhost'
                ? 30000000
                : expMinusCurrentTimestamp(decodedAccessToken.exp)
        )
        sessionStorage.setItem('refreshToken', decodedJWT.refresh_token)

        if (decodedJWT.businessProfileId) {
            sessionStorage.setItem('busProfileId', decodedJWT.businessProfileId)
        }

        try {
            login(accessToken)
            history.push('/')
            setTimeout(() => {
                window.location.reload()
            }, 300)
        } catch (e) {
            console.log('ERROR!', e)
            history.push(`/session/server-error?path=applications`)
        }
    } else {
        sessionStorage.clear()
    }

    return <></>
}

export default JwtLogin
