import axios from 'axios'
import jwtDecode from 'jwt-decode'
import ExpiryToMilliseconds from 'app/auth/ExpiryToMilliseconds'

const axiosInstance = axios.create()

const { REACT_APP_LANGUAGE, REACT_APP_X_API_KEY } = process.env
const headers = {
    'Accept-Language': REACT_APP_LANGUAGE,
    'X-Api-Key': REACT_APP_X_API_KEY,
}
// TODO: remove eslint disable once handleContinueSession is implemented
// eslint-disable-next-line no-unused-vars
const handleContinueSession = async () => {
    delete axios.defaults.headers.common.Authorization

    let headersConfig = {
        headers,
    }
    const refreshToken = sessionStorage.getItem('refreshToken')
    const params = new URLSearchParams()
    params.append('refreshToken', refreshToken)

    try {
        const response = await axios.post(
            process.env.REACT_APP_ENDPOINT + '/auth/token',
            params,
            headersConfig
        )
        const { data } = response

        if (data) {
            let accessToken = data.access_token
            let decodedAccessToken = jwtDecode(accessToken)
            sessionStorage.setItem('accessToken', accessToken)
            sessionStorage.setItem(
                'expire_at',
                ExpiryToMilliseconds(decodedAccessToken.exp)
            )
            setTimeout(() => {
                window.location.reload()
            }, 300)
        }

        return response.data
    } catch (e) {
        if (e.response.status === 401 || e.response.status === 403) {
            sessionStorage.clear()
            const getUrl = process.env.REACT_APP_COMMON_URL + 'session/logout'
            window.location.href = getUrl
        }
    }
}

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
            handleContinueSession()
        }
        throw error
    }
)

export default axiosInstance
