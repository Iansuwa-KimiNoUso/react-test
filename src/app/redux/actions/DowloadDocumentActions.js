import history from 'history.js'
import FileSaver from 'file-saver'

export const DOWNLOAD_DOCUMENTS = 'DOWNLOAD_DOCUMENTS'
export const API_LOADING = 'API_LOADING'

const {
    REACT_APP_COMMON_API,
    REACT_APP_DOCUMENT,
    REACT_APP_X_API_KEY,
    REACT_APP_LANGUAGE,
} = process.env
const getAccessToken = sessionStorage.getItem('accessToken')
const headers = {
    'Accept-Language': REACT_APP_LANGUAGE,
    'Content-Type': 'application/json',
    'X-Api-Key': REACT_APP_X_API_KEY,
}
headers['Authorization'] = `Bearer ${getAccessToken}`

export const downloadDocuments = (appID, code) => (dispatch) => {
    dispatch({ type: API_LOADING, payload: true })
    const xhr = new XMLHttpRequest()
    xhr.open(
        'GET',
        `${REACT_APP_COMMON_API}/${REACT_APP_DOCUMENT}/v1/api/storage/download-documents?referenceId=${appID}&client=${code}`,
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
            const fileName = `${appID}_Documents.zip`
            FileSaver.saveAs(blob, fileName)

            dispatch({ type: API_LOADING, payload: false })
            dispatch({
                type: DOWNLOAD_DOCUMENTS,
                payload: xhr.response,
            })
        }
        if (xhr.status !== 200) {
            console.log('ERROR!', xhr)
            dispatch({ type: API_LOADING, payload: false })
            history.push(`/session/server-error?path=applications`)
        }
    }
    xhr.responseType = 'arraybuffer'
    xhr.send()
}
