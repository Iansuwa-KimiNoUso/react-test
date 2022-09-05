import axios from 'axios'
import history from 'history.js'
import _ from 'lodash'

export const GET_NATIONALITIES = 'GET_NATIONALITIES'
export const GET_COUNTRY_CODES = 'GET_COUNTRY_CODES'
export const GET_LOAN_PURPOSES = 'GET_LOAN_PURPOSES'
export const GET_PROVINCES = 'GET_PROVINCES'
export const GET_ACCOUNT_TYPES = 'GET_ACCOUNT TYPES'
export const GET_INDUSTRY = 'GET_INDUSTRY'
export const GET_DISTRICT = 'GET_DISTRICT'
export const GET_SUBDISTRICT = 'GET_SUBDISTRICT'
export const GET_POSTAL = 'GET_POSTAL'
export const GET_BUSINESS_TYPE = 'GET_BUSINESS_TYPE'
export const GET_ENTITY_TYPE = 'GET_ENTITY_TYPE'

const {
    REACT_APP_API,
    REACT_APP_CONTENT,
    REACT_APP_LANGUAGE: lang,
    REACT_APP_X_API_KEY,
} = process.env

const getAccessToken = sessionStorage.getItem('accessToken')
const headers = {
    'Accept-Language': lang,
    'Content-Type': 'application/json',
    'X-Api-Key': REACT_APP_X_API_KEY,
}
headers['Authorization'] = `Bearer ${getAccessToken}`

export const getNationalities = (client) => (dispatch) => {
    axios
        .get(`${REACT_APP_API}/${REACT_APP_CONTENT}/nationality`, {
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
                type: GET_NATIONALITIES,
                payload: sortAsc(res.data, lang === 'th' ? 'nameTh' : 'nameEn'),
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

export const getCountryCodes = (client) => (dispatch) => {
    axios
        .get(`${REACT_APP_API}/${REACT_APP_CONTENT}/country`, {
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
                type: GET_COUNTRY_CODES,
                payload: sortAsc(res.data, lang === 'th' ? 'nameTh' : 'nameEn'),
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

export const getloanPurposes = (client) => (dispatch) => {
    dispatch({
        type: GET_LOAN_PURPOSES,
    })
}

export const getProvinces = (client) => (dispatch) => {
    axios
        .get(`${REACT_APP_API}/${REACT_APP_CONTENT}/province`, {
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
                type: GET_PROVINCES,
                payload: sortAsc(res.data, lang === 'th' ? 'nameTh' : 'nameEn'),
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

export const getaccountTypes = (client) => (dispatch) => {
    dispatch({
        type: GET_ACCOUNT_TYPES,
    })
}

export const getDistrict = (provinceCode) => (dispatch) => {
    axios
        .get(
            `${REACT_APP_API}/${REACT_APP_CONTENT}/district?provinceCode=${provinceCode}`,
            { headers }
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
                type: GET_DISTRICT,
                payload: sortAsc(res.data, lang === 'th' ? 'nameTh' : 'nameEn'),
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

export const getSubDistrict = (districtCode) => (dispatch) => {
    axios
        .get(
            `${REACT_APP_API}/${REACT_APP_CONTENT}/sub-district?districtCode=${districtCode}`,
            { headers }
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
                type: GET_SUBDISTRICT,
                payload: sortAsc(res.data, lang === 'th' ? 'nameTh' : 'nameEn'),
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

export const getPostal = (subDistrictCode) => (dispatch) => {
    axios
        .get(
            `${REACT_APP_API}/${REACT_APP_CONTENT}/postal-code?subDistrictCode=${subDistrictCode}`,
            { headers }
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
                type: GET_POSTAL,
                payload: sortAsc(res.data, lang === 'th' ? 'nameTh' : 'nameEn'),
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

export const getBusinessType = (client) => (dispatch) => {
    axios
        .get(`${REACT_APP_API}/${REACT_APP_CONTENT}/business-type`, {
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
                type: GET_BUSINESS_TYPE,
                payload: sortAsc(res.data, lang === 'th' ? 'nameTh' : 'nameEn'),
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

export const getTypeOfEntity = (client) => (dispatch) => {
    axios
        .get(`${REACT_APP_API}/${REACT_APP_CONTENT}/entity-type`, {
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
                type: GET_ENTITY_TYPE,
                payload: sortAsc(res.data, lang === 'th' ? 'nameTh' : 'nameEn'),
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

export const getIndustry = (client) => (dispatch) => {
    axios
        .get(`${REACT_APP_API}/${REACT_APP_CONTENT}/industry`, {
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
                type: GET_INDUSTRY,
                payload: sortAsc(res.data, lang === 'th' ? 'nameTh' : 'nameEn'),
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

const sortAsc = (valueList, key) => {
    return valueList.sort(function (a, b) {
        if (a.key < b.key) {
            return -1
        }
        if (a.key > b.key) {
            return 1
        }
        return 0
    })
}
