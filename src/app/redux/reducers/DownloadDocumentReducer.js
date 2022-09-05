import {
    API_LOADING,
    DOWNLOAD_DOCUMENTS,
} from '../actions/DowloadDocumentActions'

const initialState = {
    downloadDocsLoading: false,
    downloadDocs: {},
}

const DownloadDocumentReducer = function (state = initialState, action) {
    switch (action.type) {
        case API_LOADING: {
            return {
                ...state,
                downloadDocsLoading: action.payload,
            }
        }
        case DOWNLOAD_DOCUMENTS: {
            return {
                ...state,
                downloadDocs: { ...action.payload },
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default DownloadDocumentReducer
