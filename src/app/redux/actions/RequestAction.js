import _ from 'lodash'
import axios from '../../../axios.js'
import history from 'history.js'
import FileSaver from 'file-saver'
import { format } from 'date-fns'

export const GET_REQUESTS_PENDING_REVIEW = 'GET_REQUESTS_PENDING_REVIEW'
export const SET_IS_FETCHING_REQUESTS_PENDING_REVIEW =
    'SET_IS_FETCHING_REQUESTS_PENDING_REVIEW'
export const GET_REQUESTS_APPROVED_REJECTED = 'GET_REQUESTS_APPROVED_REJECTED'
export const SET_IS_FETCHING_REQUESTS_APPROVED_REJECTED =
    'SET_IS_FETCHING_REQUESTS_APPROVED_REJECTED'
export const GET_REQUEST_STATUS_DETAIL = 'GET_REQUEST_STATUS_DETAIL'
export const SET_IS_FETCHING_REQUEST_STATUS_DETAIL =
    'SET_IS_FETCHING_REQUEST_STATUS_DETAIL'
export const GET_REQUEST_DOWNLOAD_DOCUMENTS = 'GET_REQUEST_DOWNLOAD_DOCUMENTS'
export const SET_IS_FETCHING_REQUEST_DOWNLOAD_DOCUMENTS =
    'SET_IS_FETCHING_REQUEST_DOWNLOAD_DOCUMENTS'
export const GET_PENDING_REVIEW_DETAIL = 'GET_PENDING_REVIEW_DETAIL'
export const SET_IS_FETCHING_PENDING_REVIEW_DETAIL =
    'SET_IS_FETCHING_PENDING_REVIEW_DETAIL'
const {
    REACT_APP_API,
    REACT_APP_X_API_KEY,
    REACT_APP_LANGUAGE,
    REACT_APP_TRANSACTION,
} = process.env
const getAccessToken = sessionStorage.getItem('accessToken')
const headers = {
    'Accept-Language': REACT_APP_LANGUAGE,
    'Content-Type': 'application/json',
    'X-Api-Key': REACT_APP_X_API_KEY,
}
headers['Authorization'] = `Bearer ${getAccessToken}`
let headersConfig = {
    headers,
}

export const getRequestsPendingReview = (params) => (dispatch) => {
    dispatch({
        type: SET_IS_FETCHING_REQUESTS_PENDING_REVIEW,
        payload: true,
    })
    axios
        .get(`${REACT_APP_API}/${REACT_APP_TRANSACTION}/entity-request-list`, {
            params,
            headers,
        })
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
                type: SET_IS_FETCHING_REQUESTS_PENDING_REVIEW,
                payload: false,
            })
            dispatch({
                type: GET_REQUESTS_PENDING_REVIEW,
                payload: res.data,
            })
            return Promise.resolve()
        })
        .catch((error) => {
            console.log('error.response', error.response)
            dispatch({
                type: SET_IS_FETCHING_REQUESTS_PENDING_REVIEW,
                payload: false,
            })
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

export const getRequestsApprovedRejected = (params) => (dispatch) => {
    dispatch({
        type: SET_IS_FETCHING_REQUESTS_APPROVED_REJECTED,
        payload: true,
    })
    axios
        .get(`${REACT_APP_API}/${REACT_APP_TRANSACTION}/entity-request-list`, {
            params,
            headers,
        })
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
                type: SET_IS_FETCHING_REQUESTS_APPROVED_REJECTED,
                payload: false,
            })
            dispatch({
                type: GET_REQUESTS_APPROVED_REJECTED,
                payload: res.data,
            })
            return Promise.resolve()
        })
        .catch((error) => {
            console.log('error.response', error.response)
            dispatch({
                type: SET_IS_FETCHING_REQUESTS_APPROVED_REJECTED,
                payload: false,
            })
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

export const postRequestStatusDetail = (params) => (dispatch) => {
    dispatch({
        type: SET_IS_FETCHING_REQUEST_STATUS_DETAIL,
        payload: true,
    })
    axios
        .post(
            `${REACT_APP_API}/${REACT_APP_TRANSACTION}/entity-request-status`,
            JSON.stringify(params),
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

            dispatch({
                type: SET_IS_FETCHING_REQUEST_STATUS_DETAIL,
                payload: false,
            })

            dispatch({
                type: GET_REQUEST_STATUS_DETAIL,
                payload: res.data,
            })

            return Promise.resolve()
        })
        .catch((error) => {
            console.log('error.response', error.response)
            dispatch({
                type: SET_IS_FETCHING_REQUEST_STATUS_DETAIL,
                payload: false,
            })
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

export const getPendingReviewDetail = (params) => (dispatch) => {
    dispatch({
        type: SET_IS_FETCHING_PENDING_REVIEW_DETAIL,
        payload: true,
    })
    axios
        .get(`${REACT_APP_API}/${REACT_APP_TRANSACTION}/request-summary`, {
            params,
            headers,
        })
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
                type: SET_IS_FETCHING_PENDING_REVIEW_DETAIL,
                payload: false,
            })
            dispatch({
                type: GET_PENDING_REVIEW_DETAIL,
                payload: res.data,
            })
            return Promise.resolve()
        })
        .catch((error) => {
            console.log('error.response', error.response)
            dispatch({
                type: SET_IS_FETCHING_PENDING_REVIEW_DETAIL,
                payload: false,
            })
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

export const downloadRequests = (payload) => (dispatch) => {
    let data = payload
    dispatch({
        type: SET_IS_FETCHING_REQUEST_DOWNLOAD_DOCUMENTS,
        payload: true,
    })
    const formatDate = format(new Date(), 'ddMMyyyy')
    const xhr = new XMLHttpRequest()
    xhr.open(
        'POST',
        `${REACT_APP_API}/${REACT_APP_TRANSACTION}/export-data`,
        true
    )
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
    xhr.setRequestHeader('Accept-Language', REACT_APP_LANGUAGE)
    xhr.setRequestHeader('X-Api-Key', REACT_APP_X_API_KEY)
    xhr.setRequestHeader('Authorization', `Bearer ${getAccessToken}`)

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const blob = new Blob([xhr.response], {
                type: 'octet/stream',
            })
            const fileName = `${formatDate}_Requests.xlsx`
            FileSaver.saveAs(blob, fileName)

            dispatch({
                type: SET_IS_FETCHING_REQUEST_DOWNLOAD_DOCUMENTS,
                payload: false,
            })
            dispatch({
                type: GET_REQUEST_DOWNLOAD_DOCUMENTS,
                payload: xhr.response,
            })
        }
        if (xhr.status !== 200) {
            console.log('ERROR!', xhr)
            dispatch({
                type: SET_IS_FETCHING_REQUEST_DOWNLOAD_DOCUMENTS,
                payload: false,
            })
            history.push(`/session/server-error?path=applications`)
        }
    }
    xhr.responseType = 'arraybuffer'
    xhr.send(JSON.stringify(data))
}
