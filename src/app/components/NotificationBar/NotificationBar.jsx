import React, { Fragment, useEffect } from 'react'
import { Badge, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import NotifIcon from 'app/assets/images/icons/bell.svg'
import UnreadNotifIcon from 'app/assets/images/icons/bellUnread.svg'
import { useSelector, useDispatch } from 'react-redux'
import useAuth from '../../hooks/useAuth'
import { getNotification } from '../../redux/actions/NotificationActions'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    iconButtonStyle: {
        padding: 2,
    },
    badge: {
        padding: '4px',
    },
}))

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: 10,
        top: 10,
        height: '17px',
        minWidth: '17px',
    },
}))(Badge)

const { REACT_APP_X_API_KEY } = process.env
const accessToken = window.sessionStorage.getItem('accessToken')
const headers = {
    Authorization: `Bearer ${accessToken}`,
    'X-Api-Key': REACT_APP_X_API_KEY,
}

const NotificationBar = ({ container }) => {
    const { businessProfileId } =
        useAuth().authData['https://api.abc.com/user_info']

    let busProfileId = businessProfileId
    if (busProfileId === undefined || busProfileId === null) {
        busProfileId = sessionStorage.getItem('busProfileId')
    }

    const notifs = useSelector((state) => state.notifications)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getNotification(busProfileId, headers))
    }, [dispatch])

    const classes = useStyles()
    let readNotif = notifs.filter((notif) => notif.isRead === false)
    return (
        <Fragment>
            <Link to="/notifications">
                <IconButton className={classes.iconButtonStyle}>
                    {notifs &&
                        (readNotif.length !== 0 ? (
                            <StyledBadge
                                color="error"
                                overlap="circular"
                                badgeContent=" "
                                className={classes.badge}
                            >
                                <img src={UnreadNotifIcon} alt="" />
                            </StyledBadge>
                        ) : (
                            <img src={NotifIcon} alt="" />
                        ))}
                </IconButton>
            </Link>
        </Fragment>
    )
}

export default NotificationBar
