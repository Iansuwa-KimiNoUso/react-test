import { GET_SUPPLIER_DETAILS } from '../actions/SupplierActions'

const initialState = {
    supplierDetails: [],
}

const SupplierReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_SUPPLIER_DETAILS: {
            return {
                ...state,
                supplierDetails: { ...action.payload },
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default SupplierReducer
