import {
    GET_APPLICATION_SUMMARY,
    APPROVE_APPLICATION_SUMMARY,
    API_LOADING_APPROVE,
    REJECT_APPLICATION_SUMMARY,
    API_LOADING_REJECT,
    WITHDRAW_APPLICATION_SUMMARY,
    API_LOADING_WITHDRAW,
} from '../actions/ApplicationSummaryActions'

const initialState = {
    applicationSummary: {},
    appSummaryApprove: {},
    loadingApprove: false,
    appSummaryReject: {},
    loadingReject: false,
    appSummaryWithdraw: {},
    loadingWithDraw: false,
}

const ApplicationSummaryReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_APPLICATION_SUMMARY: {
            return {
                ...state,
                applicationSummary: action.payload,
            }
        }
        case API_LOADING_APPROVE: {
            return {
                ...state,
                loadingApprove: action.payload,
            }
        }
        case APPROVE_APPLICATION_SUMMARY: {
            return {
                ...state,
                appSummaryApprove: action.payload,
            }
        }
        case API_LOADING_REJECT: {
            return {
                ...state,
                loadingReject: action.payload,
            }
        }
        case REJECT_APPLICATION_SUMMARY: {
            return {
                ...state,
                appSummaryReject: action.payload,
            }
        }
        case API_LOADING_WITHDRAW: {
            return {
                ...state,
                loadingWithDraw: action.payload,
            }
        }
        case WITHDRAW_APPLICATION_SUMMARY: {
            return {
                ...state,
                appSummaryWithdraw: action.payload,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default ApplicationSummaryReducer
