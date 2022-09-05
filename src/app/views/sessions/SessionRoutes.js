import React from 'react'
import JwtLogin from './login/JwtLogin'
import ServerError from './ServerError'
import history from 'history.js'
import { authRoles } from '../../auth/authRoles'

let logVal = sessionStorage.getItem('log')
let logData = `${JSON.stringify('1')}, '1', 1`
if (window.location.pathname === '/home' && logData.includes(logVal)) {
    history.push('/applications')
}

const sessionRoutes = [
    {
        path: '/home',
        component: React.lazy(() => import('./home/LandingPage')),
        auth: authRoles.sa,
    },
    {
        path: '/session/signin',
        component: JwtLogin,
    },
    {
        path: '/session/server-error',
        component: ServerError,
    },
]

export default sessionRoutes
