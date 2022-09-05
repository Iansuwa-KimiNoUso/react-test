import {
    GET_TERMS_AND_CONDITIONS,
} from '../actions/TermsAndConditionsActions';

const initialState = {
    termsAndConditions: null,
}

const TermsAndConditionsReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_TERMS_AND_CONDITIONS: {
            return {
                ...state,
                termsAndConditions: {...action.payload},
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default TermsAndConditionsReducer;
