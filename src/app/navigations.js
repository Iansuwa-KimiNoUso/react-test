import Dashboard from '../app/assets/images/icons/dashboard.svg'
import Invoices from '../app/assets/images/icons/invoices.svg'
export const navigations = [
    {
        name: 'applications',
        path: '/applications',
        icon: Dashboard,
    },
    {
        name: 'requests',
        path: '/request',
        icon: Invoices,
        children: [
            {
                name: 'pendingReview',
                path: '/request/pending-review',
            },
            {
                name: 'approvedRejected',
                path: '/request/approved-rejected',
            },
        ],
    },
]
