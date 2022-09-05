import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    root: {
        padding: '24px 24px 50px',
        borderRadius: 8,
    },
    title: {
        fontWeight: 700,
        color: '#008C44',
        marginBottom: 15,
    },
}))

const SCPaper = (props) => {
    const classes = useStyles()

    return (
        <Paper
            id={props.id}
            className={`${classes.root} ${props.className}`}
            elevation={0}
            style={{marginBottom: props.marginBottom}}
        >
            {props.title ? (
                <Typography className={classes.title} variant="h5">
                    {props.title}
                </Typography>
            ) : (
                ''
            )}
            {props.children}
        </Paper>
    )
}

export default SCPaper
