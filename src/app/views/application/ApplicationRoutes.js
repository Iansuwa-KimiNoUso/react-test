import React from 'react'

if (window.performance.navigation && window.performance.navigation.type === 2) {
    sessionStorage.clear()
    window.location.reload()
}

const applicationRoutes = [
    {
        path: '/applications',
        component: React.lazy(() => import('./Applications')),
    },
    {
        path: '/application-summary',
        component: React.lazy(() => import('./ApplicationSummary')),
    },
]

export default applicationRoutes
