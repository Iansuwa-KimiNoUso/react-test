import React from 'react'
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom'
import AppContext from './contexts/AppContext'
import history from 'history.js'
import routes from './RootRoutes'
import {
    GlobalCss,
    MatxSuspense,
    MatxTheme,
    MatxLayout,
    SCSupplierDetails,
} from 'app/components'
import sessionRoutes from './views/sessions/SessionRoutes'
import AuthGuard from './auth/AuthGuard'
import IdleTimer from './auth/IdleTimer'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import Network from 'react-network'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import useTranslation from 'app/hooks/translations'
import { NotificationSyncProvider } from './contexts/NotificationSyncContext'

const useStyles = makeStyles((theme) => ({
    root: {
        height: 300,
        flexGrow: 1,
        minWidth: 300,
        transform: 'translateZ(0)',

        '@media all and (-ms-high-contrast: none)': {
            display: 'none',
        },
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    paper: {
        width: '100%',
        maxWidth: 435,
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: '5px',
    },
    bgColor: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    title: {
        margin: '5px 0',
    },
}))

const App = () => {
    const translation = useTranslation()
    const classes = useStyles()
    const rootRef = React.useRef(null)
    const [key, setKey] = React.useState(0)

    return (
        <AppContext.Provider value={{ routes }}>
            <SettingsProvider>
                <NotificationSyncProvider value={{ key, setKey }}>
                    <MatxTheme>
                        <GlobalCss />
                        <BrowserRouter basename={process.env.PUBLIC_URL}>
                            <Router history={history}>
                                <Network
                                    render={({ online }) => (
                                        <div>
                                            {online ? (
                                                ''
                                            ) : (
                                                <Modal
                                                    disablePortal
                                                    disableEnforceFocus
                                                    disableAutoFocus
                                                    open
                                                    aria-labelledby="server-modal-title"
                                                    aria-describedby="server-modal-description"
                                                    className={classes.modal}
                                                    container={() =>
                                                        rootRef.current
                                                    }
                                                    BackdropProps={{
                                                        classes: {
                                                            root: classes.bgColor,
                                                        },
                                                    }}
                                                >
                                                    <div
                                                        className={
                                                            classes.paper
                                                        }
                                                    >
                                                        <h2
                                                            className={
                                                                classes.title
                                                            }
                                                        >
                                                            {
                                                                translation
                                                                    .general_error
                                                                    .internet
                                                            }
                                                        </h2>
                                                    </div>
                                                </Modal>
                                            )}
                                        </div>
                                    )}
                                />
                                <AuthProvider>
                                    <MatxSuspense>
                                        <Switch>
                                            {sessionRoutes.map((item, i) => (
                                                <Route
                                                    key={i}
                                                    path={item.path}
                                                    component={item.component}
                                                />
                                            ))}

                                            <AuthGuard>
                                                <IdleTimer>
                                                    <SCSupplierDetails>
                                                        <MatxLayout />{' '}
                                                    </SCSupplierDetails>
                                                </IdleTimer>
                                            </AuthGuard>
                                        </Switch>
                                    </MatxSuspense>
                                </AuthProvider>
                            </Router>
                        </BrowserRouter>
                    </MatxTheme>
                </NotificationSyncProvider>
            </SettingsProvider>
        </AppContext.Provider>
    )
}

export default App
