import React from 'react'
import { authRoles } from '../../auth/authRoles'

if (window.performance.navigation && window.performance.navigation.type === 2) {
    sessionStorage.clear()
    window.location.reload()
}

const RequestsRoutes = [
    {
        path: '/request/pending-review',
        component: React.lazy(() => import('./PendingReview')),
        auth: authRoles.sa,
    },
    {
        path: '/request/approved-rejected',
        component: React.lazy(() => import('./ApprovedRejected')),
        auth: authRoles.sa,
    },
    {
        path: '/request/pending-review-summary',
        component: React.lazy(() => import('./RequestSummary')),
        auth: authRoles.sa,
    },
    {
        path: '/request/approved-rejected-summary',
        component: React.lazy(() => import('./RequestSummary')),
        auth: authRoles.sa,
    },
]

export default RequestsRoutes
