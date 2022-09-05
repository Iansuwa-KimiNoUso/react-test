import axios from '../../../axios.js'
import history from 'history.js'

export const GET_NOTIFICATION = 'GET_NOTIFICATION'
export const READ_NOTIFICATION = 'READ_NOTIFICATION'
export const READ_SELECTED_NOTIFICATIONS = 'READ_SELECTED_NOTIFICATIONS'
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'

const { REACT_APP_API, REACT_APP_NOTIF } = process.env

export const getNotification = (id, headers) => {
    return (dispatch) => {
        axios
            .get(
                `${REACT_APP_API}/${REACT_APP_NOTIF}/notif-message?businessProfileId=${id}`,
                { headers: headers }
            )
            .then((res) => {
                dispatch({
                    type: GET_NOTIFICATION,
                    payload: res.data.NotificationList,
                })
            })
            .catch((e) => {
                console.log(e)
                history.push('/session/server-error?path=dashboard')
            })
    }
}

export const deleteNotification =
    (businessProfileId, notifId, headers) => (dispatch) => {
        axios
            .post(
                `${REACT_APP_API}/${REACT_APP_NOTIF}/delete-message`,
                {
                    businessProfileId: businessProfileId,
                    notificationIds: [notifId],
                },
                { headers }
            )
            .then((res) => {
                dispatch({
                    type: DELETE_NOTIFICATION,
                    payload: res.data,
                })
            })
            .catch((e) => {
                console.log(e)
                history.push('/session/server-error?path=dashboard')
            })
    }

export const readNotifications =
    (businessProfileId, notifId, headers) => (dispatch) => {
        axios
            .post(
                `${REACT_APP_API}/${REACT_APP_NOTIF}/read-message`,
                {
                    businessProfileId: businessProfileId,
                    notificationIds: [notifId],
                },
                { headers }
            )
            .then((res) => {
                dispatch({
                    type: READ_NOTIFICATION,
                    payload: res.data,
                })
            })
            .catch((e) => {
                console.log(e)
                history.push('/session/server-error?path=dashboard')
            })
    }

export const readSelectedNotifications =
    (businessProfileId, notifId, headers) => (dispatch) => {
        axios
            .post(
                `${REACT_APP_API}/${REACT_APP_NOTIF}/read-message`,
                {
                    businessProfileId: businessProfileId,
                    notificationIds: notifId,
                },
                { headers }
            )
            .then((res) => {
                dispatch({
                    type: READ_SELECTED_NOTIFICATIONS,
                    payload: res.data,
                })
            })
            .catch((e) => {
                console.log(e)
                history.push('/session/server-error?path=dashboard')
            })
    }
