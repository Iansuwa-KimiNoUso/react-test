import {
    GET_NATIONALITIES,
    GET_COUNTRY_CODES,
    GET_LOAN_PURPOSES,
    GET_PROVINCES,
    GET_ACCOUNT_TYPES,
    GET_INDUSTRY,
    GET_DISTRICT,
    GET_SUBDISTRICT,
    GET_POSTAL,
    GET_BUSINESS_TYPE,
    GET_ENTITY_TYPE,
} from '../actions/ReferrentialDataActions'

const initialState = {
    nationalities: [],
    countryCodes: [],
    loanPurposes: [],
    accountTypes: [],
    typeOfEntity: [],
    industry: [],
    businessType: [],
    provinces: [],
    districts: [],
    subDistricts: [],
    postal: [],
}

const ReferrentialDataReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_NATIONALITIES: {
            return {
                ...state,
                nationalities: action.payload,
            }
        }
        case GET_COUNTRY_CODES: {
            return {
                ...state,
                countryCodes: action.payload,
            }
        }
        case GET_LOAN_PURPOSES: {
            return {
                ...state,
                loanPurposes: action.payload,
            }
        }
        case GET_PROVINCES: {
            return {
                ...state,
                provinces: action.payload,
            }
        }
        case GET_ACCOUNT_TYPES: {
            return {
                ...state,
                accountTypes: action.payload,
            }
        }
        case GET_INDUSTRY: {
            return {
                ...state,
                industry: action.payload,
            }
        }
        case GET_DISTRICT: {
            return {
                ...state,
                districts: action.payload,
            }
        }
        case GET_SUBDISTRICT: {
            return {
                ...state,
                subDistricts: action.payload,
            }
        }
        case GET_POSTAL: {
            return {
                ...state,
                postal: action.payload,
            }
        }
        case GET_BUSINESS_TYPE: {
            return {
                ...state,
                businessType: action.payload,
            }
        }
        case GET_ENTITY_TYPE: {
            return {
                ...state,
                typeOfEntity: action.payload,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default ReferrentialDataReducer
