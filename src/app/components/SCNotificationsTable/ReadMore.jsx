import React, { useState } from 'react'
import { Box, Typography } from '@material-ui/core'
import useTranslation from '../../../app/hooks/translations'
import { readNotifications } from '../../redux/actions/NotificationActions'
import { useDispatch } from 'react-redux'
import useNotificationSyncHook from '../../hooks/useNotificationSync'
import useAuth from '../../hooks/useAuth'

const { REACT_APP_X_API_KEY } = process.env
const accessToken = window.sessionStorage.getItem('accessToken')
const headers = {
    Authorization: `Bearer ${accessToken}`,
    'X-Api-Key': REACT_APP_X_API_KEY,
}

const Content = (
    header,
    message,
    isRead,
    showLongText,
    showShortText,
    showViewMore,
    showViewLess,
    dateTime,
    handleDelete,
    id,
    translation
) => {
    return (
        <span>
            <Box
                id="readMoremainBox"
                sx={{
                    width: '100%',
                    display: {
                        xs: 'block',
                        sm: 'block',
                        md: 'none',
                        lg: 'none',
                        xl: 'none',
                    },
                    pb: 1,
                }}
            >
                <Box
                    id="readMoreBox1"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        alignContent: 'flex-end',
                    }}
                >
                    <Typography
                        id="readMoreDate"
                        variant="body2"
                        color="secondary"
                    >
                        <b>{dateTime}</b>
                    </Typography>
                    {isRead && (
                        <Box id="readMoreBox2">
                            <Typography
                                id="readMoreDelete"
                                color="primary"
                                style={{
                                    cursor: 'pointer',
                                    fontSize: 14,
                                }}
                                onClick={() => handleDelete(id)}
                            >
                                <u>{translation.pages.notifications.Delete}</u>
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
            <Box id="readMoreBox3" sx={{ pb: 1 }}>
                <Typography
                    id="readMoreHeader"
                    style={{
                        fontSize: 16,
                        color: isRead ? '#333333' : '#008C44',
                        fontWeight: isRead ? 400 : 700,
                    }}
                >
                    {header}
                </Typography>
            </Box>
            <Box id="readMoreBox4" sx={{ pb: 1 }}>
                <Typography
                    id="readMoremessage"
                    color="secondary"
                    style={{
                        fontSize: 12,
                    }}
                >
                    {message}
                </Typography>
            </Box>
            {showViewMore && (
                <Box id="readMoreBox5">
                    <Typography
                        id="readMoreLongtxt"
                        color="primary"
                        style={{
                            color: '#008C44',
                            cursor: 'pointer',
                            display: 'block',
                            fontSize: 14,
                        }}
                        onClick={() => showLongText(id)}
                    >
                        <u>{translation.pages.notifications.ViewMore}</u>
                    </Typography>
                </Box>
            )}
            {showViewLess && (
                <Box id="readMoreBox6">
                    <Typography
                        id="readMoreShorttxt"
                        color="primary"
                        style={{
                            cursor: 'pointer',
                            display: 'block',
                            fontSize: 14,
                        }}
                        onClick={() => showShortText()}
                    >
                        <u>{translation.pages.notifications.ViewLess}</u>
                    </Typography>
                </Box>
            )}
        </span>
    )
}

const ReadMore = (props) => {
    const { businessProfileId } =
        useAuth().authData['https://api.abc.com/user_info']

    let busProfileId = businessProfileId
    if (busProfileId === undefined || busProfileId === null) {
        busProfileId = sessionStorage.getItem('busProfileId')
    }

    const translation = useTranslation()
    const dispatch = useDispatch()
    const { setKey } = useNotificationSyncHook()
    const {
        headerNotif,
        messageNotif,
        isRead,
        headerLimit,
        messageLimit,
        dateTime,
        handleDelete,
        id,
    } = props
    const [limit, setLimit] = useState({
        headLimit: headerLimit,
        messLimit: messageLimit,
    })

    const getReadMoreContent = () => {
        if (headerNotif.length > limit.headLimit) {
            if (messageNotif.length > limit.messLimit) {
                return Content(
                    headerNotif.substr(0, limit.headLimit) + '...',
                    messageNotif.substr(0, limit.messLimit) + '...',
                    isRead,
                    showLongText,
                    showShortText,
                    true,
                    false,
                    dateTime,
                    handleDelete,
                    id,
                    translation
                )
            } else if (messageNotif.length < limit.messLimit) {
                return Content(
                    headerNotif.substr(0, limit.headLimit) + '...',
                    messageNotif,
                    isRead,
                    showLongText,
                    showShortText,
                    true,
                    false,
                    dateTime,
                    handleDelete,
                    id,
                    translation
                )
            }
        } else if (headerNotif.length < limit.headLimit) {
            if (messageNotif.length > limit.messLimit) {
                return Content(
                    headerNotif,
                    messageNotif.substr(0, limit.messLimit) + '...',
                    isRead,
                    showLongText,
                    showShortText,
                    true,
                    false,
                    dateTime,
                    handleDelete,
                    id,
                    translation
                )
            } else if (messageNotif.length < limit.messLimit) {
                return Content(
                    headerNotif,
                    messageNotif,
                    isRead,
                    showLongText,
                    showShortText,
                    false,
                    false,
                    dateTime,
                    handleDelete,
                    id,
                    translation
                )
            }
        }

        return Content(
            headerNotif,
            messageNotif,
            isRead,
            showLongText,
            showShortText,
            false,
            true,
            dateTime,
            handleDelete,
            id,
            translation
        )
    }

    const showLongText = (id) => {
        dispatch(readNotifications(businessProfileId, id, headers))
        setKey(Math.floor(Math.random() * 500000))
        setLimit({
            headLimit: headerNotif.length,
            messLimit: messageNotif.length,
        })
        getReadMoreContent()
    }

    const showShortText = () => {
        setLimit({
            headLimit: headerLimit,
            messLimit: messageLimit,
        })
        getReadMoreContent()
    }

    return <>{getReadMoreContent()}</>
}

export default ReadMore
