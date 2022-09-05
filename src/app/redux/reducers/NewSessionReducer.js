import { API_LOADING, GET_NEW_SESSION } from '../actions/NewSessionActions'

const initialState = {
    apiLoading: false,
    newSessions: {},
}

const NewSessionReducer = function (state = initialState, action) {
    switch (action.type) {
        case API_LOADING: {
            return {
                ...state,
                apiLoading: action.payload,
            }
        }
        case GET_NEW_SESSION: {
            return {
                ...state,
                newSessions: { ...action.payload },
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default NewSessionReducer
