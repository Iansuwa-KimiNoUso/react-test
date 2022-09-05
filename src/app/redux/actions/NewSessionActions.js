import axios from '../../../axios.js'
import history from 'history.js'
import _ from 'lodash'

export const GET_NEW_SESSION = 'GET_NEW_SESSION'
export const API_LOADING = 'API_LOADING'

const { REACT_APP_COMMON_API, REACT_APP_X_API_KEY, REACT_APP_LANGUAGE } =
    process.env
const headers = {
    'Accept-Language': REACT_APP_LANGUAGE,
    'Content-Type': 'application/json',
    'X-Api-Key': REACT_APP_X_API_KEY,
}
let headersConfig = {
    headers,
}

export const getNewSession = (payload) => (dispatch) => {
    let data = payload
    dispatch({ type: API_LOADING, payload: true })
    axios
        .post(
            `${REACT_APP_COMMON_API}/auth/newSession`,
            JSON.stringify(data),
            headersConfig
        )
        .then((res) => {
            dispatch({ type: API_LOADING, payload: false })

            if (!_.isEmpty(res.data) && !_.isEmpty(res.data.error)) {
                history.push({
                    pathname: '/session/server-error',
                    state: {
                        error: res.data.error,
                        path: 'applications',
                    },
                })
                return Promise.resolve()
            }

            dispatch({
                type: GET_NEW_SESSION,
                payload: res.data,
            })

            return new Promise((resolve) => setTimeout(resolve, 500))
        })
        .catch((error) => {
            dispatch({ type: API_LOADING, payload: false })

            if (
                !_.isEmpty(error.response) &&
                !_.isEmpty(error.response.data.error)
            ) {
                history.push({
                    pathname: '/session/server-error',
                    state: {
                        error: error.response.data.error,
                        path: 'applications',
                    },
                })
                return error
            }
            history.push(`/session/server-error?path=applications`)
        })
}
