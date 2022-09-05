import axios from '../../../axios.js'

export const GET_PRIVACY_POLICY = 'GET_PRIVACY_POLICY'

export const getPrivacyPolicy = () => (dispatch) => {
    axios.get('/api/privacy-policy').then((res) => {
        dispatch({
            type: GET_PRIVACY_POLICY,
            payload: res.data,
        })
        return Promise.resolve()
    })
}
