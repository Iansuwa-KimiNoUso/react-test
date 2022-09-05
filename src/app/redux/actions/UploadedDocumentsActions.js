import axios from '../../../axios.js'

export const GET_UPLOADED_DOCUMENTS = 'GET_UPLOADED_DOCUMENTS'

const { REACT_APP_X_API_KEY } = process.env
const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': REACT_APP_X_API_KEY,
}

export const getUploadedDocuments =
    (client = scf, referenceId = 1001) =>
    (dispatch) => {
        axios
            .get(
                `${REACT_APP_API}/${REACT_APP_SUPPLIER}/storage/documents?client=${client}&referenceId=${referenceId}`,
                { headers: headers }
            )
            .then((res) => {
                dispatch({
                    type: GET_UPLOADED_DOCUMENTS,
                    payload: res.data,
                })
                return Promise.resolve()
            })
    }
