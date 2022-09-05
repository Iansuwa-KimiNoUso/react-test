import axios from '../../../axios.js'
import history from 'history.js'
import _ from 'lodash'

export const GET_SUPPLIER_DETAILS = 'GET_SUPPLIER_DETAILS'

const {
    REACT_APP_API,
    REACT_APP_LANGUAGE,
    REACT_APP_BU_PROFILE,
    REACT_APP_X_API_KEY,
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
export const getSupplierDetails = (businessProfileId) => (dispatch) => {
    axios
        .get(
            `${REACT_APP_API}/${REACT_APP_BU_PROFILE}/business-profile?businessProfileId=${businessProfileId}`,
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
                type: GET_SUPPLIER_DETAILS,
                payload: res.data,
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
