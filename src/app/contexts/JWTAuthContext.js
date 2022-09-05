import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import history from 'history.js'
import _ from 'lodash'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
    isTimeRunning: false,
    timeRemaining: 0,
    authData: {},
}

const setSession = (accessToken) => {
    if (accessToken) {
        sessionStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        initialState.authData = jwtDecode(accessToken)
    } else {
        sessionStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REFRESH': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    refresh: () => Promise.resolve(),
})

const { REACT_APP_LANGUAGE, REACT_APP_X_API_KEY } = process.env
const headers = {
    'Accept-Language': REACT_APP_LANGUAGE,
    'X-Api-Key': REACT_APP_X_API_KEY,
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = (commonAccessToken = '') => {
        let user = {}

        setSession(commonAccessToken)
        sessionStorage.setItem('log', '1')

        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
    }

    const logout = async () => {
        const getAccessToken = window.sessionStorage.getItem('accessToken')
        headers['Authorization'] = `Bearer ${getAccessToken}`

        let headersConfig = {
            headers,
        }
        const refreshToken = window.sessionStorage.getItem('refreshToken')
        const params = new URLSearchParams()
        params.append('refreshToken', refreshToken)
        params.append('clientId', process.env.REACT_APP_CLIENT_ID)
        params.append('clientSecret', process.env.REACT_APP_CLIENT_SECRET)

        try {
            await axios.post(
                process.env.REACT_APP_ENDPOINT + '/auth/log-out',
                params,
                headersConfig
            )

            logoutSession()
            return Promise.resolve()
        } catch (e) {
            if (!_.isEmpty(e.response) && !_.isEmpty(e.response.data.error)) {
                history.push({
                    pathname: '/session/server-error',
                    state: {
                        error: e.response.data.error,
                        path: 'applications',
                    },
                })
                return e
            }
            history.push(`/session/server-error?path=applications`)
        }
    }

    const logoutSession = () => {
        setSession(null)
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('expire_at')
        sessionStorage.removeItem('refreshToken')
        sessionStorage.clear()
        sessionStorage.setItem('log', '0')
        dispatch({ type: 'LOGOUT' })

        const getUrl =
            process.env.REACT_APP_COMMON_URL + 'session/logout?code=ascend-nano'
        window.location.href = getUrl
    }

    const refresh = async () => {
        let user = {}
        delete axios.defaults.headers.common.Authorization

        let headersConfig = {
            headers,
        }
        const refreshToken = window.sessionStorage.getItem('refreshToken')
        const params = new URLSearchParams()
        params.append('refreshToken', refreshToken)

        try {
            const response = await axios.post(
                process.env.REACT_APP_ENDPOINT + '/auth/token',
                params,
                headersConfig
            )

            dispatch({
                type: 'REFRESH',
                payload: {
                    user,
                },
            })

            return response.data
        } catch (e) {
            if (!_.isEmpty(e.response) && !_.isEmpty(e.response.data.error)) {
                history.push({
                    pathname: '/session/server-error',
                    state: {
                        error: e.response.data.error,
                        path: 'applications',
                    },
                })
                return e
            }
            history.push(`/session/server-error?path=applications`)
        }
    }

    useEffect(() => {
        ;(async () => {
            try {
                const accessToken = window.sessionStorage.getItem('accessToken')

                if (accessToken) {
                    setSession(accessToken)

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                refresh,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
