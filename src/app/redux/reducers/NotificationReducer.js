import {
    GET_NOTIFICATION,
    DELETE_NOTIFICATION,
    READ_NOTIFICATION,
    READ_SELECTED_NOTIFICATIONS,
} from '../actions/NotificationActions'

const initialState = [];

const NotificationReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_NOTIFICATION: {
            return [...action.payload]
        }
        case DELETE_NOTIFICATION: {
            return [...state];
        }
        case READ_NOTIFICATION: {
            return [...state];
        }
        case READ_SELECTED_NOTIFICATIONS: {
            return [...state];
        }
        default: {
            return [...state]
        }
    }
}

export default NotificationReducer
