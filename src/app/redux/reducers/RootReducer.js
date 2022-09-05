import { combineReducers } from 'redux'
import NavigationReducer from './NavigationReducer'
import SupplierReducer from './SupplierReducer'
import PrivacyPolicyReducer from './PrivacyPolicyReducer'
import TermsAndConditionsReducer from './TermsAndConditionsReducer'
import ApplicationsReducer from './ApplicationsReducer'
import NewSessionReducer from './NewSessionReducer'
import ApplicationSummaryReducer from './ApplicationSummaryReducer'
import DownloadDocumentReducer from './DownloadDocumentReducer'
import ReferrentialDataReducer from './ReferrentialDataReducer'
import RequestReducer from './RequestReducer'

const RootReducer = combineReducers({
    navigations: NavigationReducer,
    supplier: SupplierReducer,
    privacyPolicy: PrivacyPolicyReducer,
    termsAndConditions: TermsAndConditionsReducer,
    applications: ApplicationsReducer,
    sessionInfo: NewSessionReducer,
    applicationSummary: ApplicationSummaryReducer,
    appDownloadDocs: DownloadDocumentReducer,
    referrentialData: ReferrentialDataReducer,
    allRequests: RequestReducer,
})
export default RootReducer
