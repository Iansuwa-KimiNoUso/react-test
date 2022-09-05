import axios from '../../../axios.js'

export const GET_TERMS_AND_CONDITIONS =
    'GET_TERMS_AND_CONDITIONS'

export const getTermsAndConditions = () => (dispatch) => {
    axios.get('/api/terms-and-conditions').then((res) => {
        dispatch({
            type: GET_TERMS_AND_CONDITIONS,
            payload: res.data,
        })
        return Promise.resolve()
    })
}
