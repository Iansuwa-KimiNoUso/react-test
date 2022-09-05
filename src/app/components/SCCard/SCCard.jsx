import React from 'react'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    root: {
        boxShadow: 'none',
    },
    cardHeader: {
        backgroundColor: '#ECF8EEA6',
        padding: '14px 18px',
        '& .MuiCardHeader-avatar': {
            display: 'flex',
            marginRight: 10,
        },
        '& .MuiCardHeader-title': {
            color: '#333',
            fontSize: 20,
            fontWeight: 700,
        },
    },
}))

const SCCard = (props) => {
    const classes = useStyles()

    return (
        <Card id={props.id} className={classes.root}>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                    <>
                        <img src={props.icon} alt="icon" />
                    </>
                }
                title={props.title}
            />
            <CardContent>{props.children}</CardContent>
        </Card>
    )
}

export default SCCard
