import { GET_PRIVACY_POLICY} from '../actions/PrivacyPolicyAction';

const initialState = {
    privacyPolicy: null,
}

const PrivacyPolicyReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_PRIVACY_POLICY: {
            return {
                ...state,
                privacyPolicy: {...action.payload},
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default PrivacyPolicyReducer;
