import React from 'react'
import { Redirect } from 'react-router-dom'
import applicationRoutes from './views/application/ApplicationRoutes'
import requestsRoutes from './views/requests/RequestsRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/applications" />,
    },
]

const errorRoute = [
    {
        component: () => (
            <Redirect to="/session/server-error?path=applications" />
        ),
    },
]

const routes = [
    ...applicationRoutes,
    ...requestsRoutes,
    ...redirectRoute,
    ...errorRoute,
]
export default routes
