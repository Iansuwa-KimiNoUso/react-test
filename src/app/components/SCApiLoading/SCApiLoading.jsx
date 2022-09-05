import React from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    backdrop: {
        zIndex: '99999',
        color: '#fff',
    },
}))

const SCApiLoading = (props) => {
    const classes = useStyles()

    return (
        <Backdrop
            id={props.id}
            className={classes.backdrop}
            open={props && props.open ? props.open : false}
        >
            <CircularProgress id={props.id} color="inherit" />
        </Backdrop>
    )
}

export default SCApiLoading
