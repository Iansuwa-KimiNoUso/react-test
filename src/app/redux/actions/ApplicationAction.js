import _ from 'lodash'
import axios from '../../../axios.js'
import history from 'history.js'

export const GET_APPLICATIONS = 'GET_APPLICATIONS'
export const SET_IS_FETCHING_APPLICATIONS = 'SET_IS_FETCHING_APPLICATIONS'

const { REACT_APP_API, REACT_APP_X_API_KEY, REACT_APP_LANGUAGE } = process.env

const getAccessToken = sessionStorage.getItem('accessToken')
const headers = {
    'Accept-Language': REACT_APP_LANGUAGE,
    'Content-Type': 'application/json',
    'X-Api-Key': REACT_APP_X_API_KEY,
}
headers['Authorization'] = `Bearer ${getAccessToken}`
// let headersConfig = {
//     headers,
// }
export const getApplications = (params) => (dispatch) => {
    dispatch({
        type: SET_IS_FETCHING_APPLICATIONS,
        payload: { isFetching: true },
    })

    axios
        .get(
            `${REACT_APP_API}/abc-supplier-composite/entity-application-list`,
            { params, headers }
        )
        .then((res) => {
            if (
                !_.isEmpty(res.data) &&
                !_.isEmpty(res.data.error) &&
                res.data.error.code !== 404
            ) {
                history.push({
                    pathname: '/session/server-error',
                    state: {
                        error: res.data.error,
                        path: 'applications',
                    },
                })
                return Promise.resolve()
            }

            const applicationsList = _.get(_.clone(res), 'data.applicationList')

            const payload = {
                applications: _.map(applicationsList, 'Record'),
                pagination: _.get(res, 'data.pageable'),
            }
            dispatch({
                type: GET_APPLICATIONS,
                payload,
            })
            dispatch({
                type: SET_IS_FETCHING_APPLICATIONS,
                payload: { isFetching: false },
            })

            return Promise.resolve()
        })
        .catch((error) => {
            dispatch({
                type: SET_IS_FETCHING_APPLICATIONS,
                payload: { isFetching: false },
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
