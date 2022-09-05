import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { amber } from '@material-ui/core/colors'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    success: {
        backgroundColor: 'rgb(51, 51, 51, .8)',
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: 'rgb(51, 51, 51, .8)',
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    messageCss: {
        alignItems: 'center',
        textAlign: 'center',
    },
    margin: {
        margin: theme.spacing(1),
        minWidth: '100%',
    },
    barContent: {
        maxWidth: '100%',
        minWidth: '100%',
        textAlign: 'center',
        display: 'block',
        borderRadius: 0,
    },
}))

export const MySnackbarContentWrapper = (props) => {
    const { classes, message, onClose, variant, ...other } = props

    return (
        <SnackbarContent
            id="snackbarContent"
            className={clsx(classes[variant], classes.barContent)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.messageCss}>
                    {message}
                </span>
            }
            {...other}
        />
    )
}

MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info'])
        .isRequired,
}

export const ScreenWidth = () => {
    // const getScreenWidth = window.screen.width
    let getStyleCSS = {
        width: '100%',
        minWidth: '100%',
        bottom: '0',
        textAlign: 'center',
        left: '0%',
        right: 'auto',
        transform: 'translateX(0%)',
        position: 'absolute',
        top: 'auto',
    }

    return getStyleCSS
}

export default function CustomizedSnackbar(props) {
    const classes = useStyles()
    const getScreenWidth = window.screen.width

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical:
                        getScreenWidth <= 1024
                            ? 'bottom'
                            : /* istanbul ignore next */ 'top',
                    horizontal: 'center',
                }}
                open={props.open}
                autoHideDuration={5000}
                style={ScreenWidth()}
            >
                <MySnackbarContentWrapper
                    onClose={props.handleClose}
                    variant={
                        props && props.variant
                            ? /* istanbul ignore next */ props.variant
                            : 'success'
                    }
                    message={
                        props && props.message
                            ? /* istanbul ignore next */ props.message
                            : ''
                    }
                    classes={classes}
                />
            </Snackbar>
        </div>
    )
}
