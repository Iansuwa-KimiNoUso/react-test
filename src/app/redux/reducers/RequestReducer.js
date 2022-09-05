import {
    GET_REQUESTS_PENDING_REVIEW,
    SET_IS_FETCHING_REQUESTS_PENDING_REVIEW,
    GET_REQUESTS_APPROVED_REJECTED,
    SET_IS_FETCHING_REQUESTS_APPROVED_REJECTED,
    GET_REQUEST_STATUS_DETAIL,
    SET_IS_FETCHING_REQUEST_STATUS_DETAIL,
    GET_REQUEST_DOWNLOAD_DOCUMENTS,
    SET_IS_FETCHING_REQUEST_DOWNLOAD_DOCUMENTS,
    GET_PENDING_REVIEW_DETAIL,
    SET_IS_FETCHING_PENDING_REVIEW_DETAIL
} from '../actions/RequestAction'

//TODO: Integration set this value to proper inital state
const initialState = {
    requestsPendingReview: [],
    isFetchingRequestsPendingReview: false,
    requestsApprovedRejected: [],
    isFetchingRequestsApprovedRejected: false,
    requestsStatusDetail: [],
    isFetchingRequestsStatusDetail: false,
    requestsDownload: {},
    isFetchingRequestsDownload: false,
    pendingReviewDetail: [],
    isFetchingPendingRequestDetail: false
}

const RequestReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_REQUESTS_PENDING_REVIEW: {
            return {
                ...state,
                requestsPendingReview: action.payload,
            }
        }
        case SET_IS_FETCHING_REQUESTS_PENDING_REVIEW: {
            return {
                ...state,
                isFetchingRequestsPendingReview: action.payload,
            }
        }
        case GET_REQUESTS_APPROVED_REJECTED: {
            return {
                ...state,
                requestsApprovedRejected: action.payload,
            }
        }
        case SET_IS_FETCHING_REQUESTS_APPROVED_REJECTED: {
            return {
                ...state,
                isFetchingRequestsApprovedRejected: action.payload,
            }
        }
        case GET_REQUEST_STATUS_DETAIL: {
            return {
                ...state,
                requestsStatusDetail: action.payload,
            }
        }
        case SET_IS_FETCHING_REQUEST_STATUS_DETAIL: {
            return {
                ...state,
                isFetchingRequestsStatusDetail: action.payload,
            }
        }
        case GET_REQUEST_DOWNLOAD_DOCUMENTS: {
            return {
                ...state,
                requestsDownload: action.payload,
            }
        }
        case SET_IS_FETCHING_REQUEST_DOWNLOAD_DOCUMENTS: {
            return {
                ...state,
                isFetchingRequestsDownload: action.payload,
            }
        }
        case GET_PENDING_REVIEW_DETAIL: {
            return {
                ...state,
                pendingReviewDetail: action.payload
            }
        }
        case SET_IS_FETCHING_PENDING_REVIEW_DETAIL: {
            return {
                ...state,
                isFetchingPendingRequestDetail: action.payload,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default RequestReducer
