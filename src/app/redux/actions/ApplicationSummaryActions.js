import axios from '../../../axios.js'
import history from 'history.js'
import _ from 'lodash'

const {
    REACT_APP_LANGUAGE: lang,
    REACT_APP_API,
    REACT_APP_SUPPLIER,
    REACT_APP_X_API_KEY,
} = process.env

const getAccessToken = window.sessionStorage.getItem('accessToken')
const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': lang,
    'X-Api-Key': REACT_APP_X_API_KEY,
}
headers['Authorization'] = `Bearer ${getAccessToken}`
let headersConfig = {
    headers,
}

export const GET_APPLICATION_SUMMARY = 'GET_APPLICATION_SUMMARY'
export const APPROVE_APPLICATION_SUMMARY = 'APPROVE_APPLICATION_SUMMARY'
export const API_LOADING_APPROVE = 'API_LOADING_APPROVE'
export const REJECT_APPLICATION_SUMMARY = 'REJECT_APPLICATION_SUMMARY'
export const API_LOADING_REJECT = 'API_LOADING_REJECT'
export const WITHDRAW_APPLICATION_SUMMARY = 'WITHDRAW_APPLICATION_SUMMARY'
export const API_LOADING_WITHDRAW = 'API_LOADING_WITHDRAW'

export const getApplicationSummary = (applicationId) => (dispatch) => {
    axios
        .get(
            `${REACT_APP_API}/${REACT_APP_SUPPLIER}/entity-application-detail?applicationId=${applicationId}`,
            { headers: headers }
        )
        .then((res) => {
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
                type: GET_APPLICATION_SUMMARY,
                payload: res.data.applicationSummary,
            })

            return Promise.resolve()
        })
        .catch((error) => {
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

export const approveApplicationSummary = (payload) => (dispatch) => {
    let data = payload

    dispatch({ type: API_LOADING_APPROVE, payload: true })
    axios
        .post(
            `${REACT_APP_API}/${REACT_APP_SUPPLIER}/approve-entity-application`,
            JSON.stringify(data),
            headersConfig
        )
        .then((res) => {
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

            dispatch({ type: API_LOADING_APPROVE, payload: false })
            dispatch({
                type: APPROVE_APPLICATION_SUMMARY,
                payload: res.data,
            })
            return Promise.resolve()
        })
        .catch((error) => {
            console.log('error APPROVE !!!!', error)
            dispatch({ type: API_LOADING_APPROVE, payload: false })
            history.push(`/session/server-error?path=applications`)
        })
}

export const rejectApplicationSummary = (payload) => (dispatch) => {
    let data = payload

    dispatch({ type: API_LOADING_REJECT, payload: true })
    axios
        .post(
            `${REACT_APP_API}/${REACT_APP_SUPPLIER}/reject-entity-application`,
            JSON.stringify(data),
            headersConfig
        )
        .then((res) => {
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

            dispatch({ type: API_LOADING_REJECT, payload: false })
            dispatch({
                type: REJECT_APPLICATION_SUMMARY,
                payload: res.data,
            })
            return Promise.resolve()
        })
        .catch((error) => {
            console.log('error REJECT !!!!', error)
            dispatch({ type: API_LOADING_REJECT, payload: false })
            history.push(`/session/server-error?path=applications`)
        })
}

export const withdrawApplicationSummary = (payload) => (dispatch) => {
    let data = payload

    dispatch({ type: API_LOADING_WITHDRAW, payload: true })
    axios
        .post(
            `${REACT_APP_API}/${REACT_APP_SUPPLIER}/withdraw-entity-application`,
            JSON.stringify(data),
            headersConfig
        )
        .then((res) => {
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

            dispatch({ type: API_LOADING_WITHDRAW, payload: false })
            dispatch({
                type: WITHDRAW_APPLICATION_SUMMARY,
                payload: res.data,
            })
            return Promise.resolve()
        })
        .catch((error) => {
            console.log('error WITHDRAW !!!!', error)
            dispatch({ type: API_LOADING_WITHDRAW, payload: false })
            history.push(`/session/server-error?path=applications`)
        })
}
