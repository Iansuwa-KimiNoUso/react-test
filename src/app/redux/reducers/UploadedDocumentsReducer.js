import { GET_UPLOADED_DOCUMENTS } from '../actions/UploadedDocumentsActions';

const initialState = {
    termsAndConditions: null,
}

const UploadedDocumentsReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_UPLOADED_DOCUMENTS: {
            return {
                ...state,
                uploadedDocuments: { ...action.payload },
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default UploadedDocumentsReducer;
