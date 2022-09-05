import {
    GET_APPLICATIONS,
    SET_IS_FETCHING_APPLICATIONS
} from '../actions/ApplicationAction'
import _ from 'lodash'

//TODO: Integration set this value to proper inital state
const initialState = {
    applications: [],
    pagination: { offset: 0, pageSize: 10, totalRecords: 1 },
    isFetching: false
}

const SupplierReducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_APPLICATIONS: {
            return {
                ...state,
                applications: _.get(action, 'payload.applications'),
                pagination: _.get(action, 'payload.pagination')
            }
        }
        case SET_IS_FETCHING_APPLICATIONS: {
            return {
                ...state,
                isFetching: _.get(action, 'payload.isFetching')
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
