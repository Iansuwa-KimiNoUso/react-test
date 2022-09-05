import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import _ from 'lodash'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    root: {
        color: '#333',
        fontSize: '40px',
        fontWeight: 700,
    },
    secondTitle: {
        color: '#333',
        fontSize: '20px',
        fontWeight: 400,
    },
}))

const SCPageHeading = (props) => {
    const classes = useStyles()

    return (
        <>
            {!_.isEmpty(props.secondTitle) ? (
                <div className="headertitles">
                    <Typography
                        id={props.id}
                        className={`${classes.root} mb-0`}
                    >
                        {props.title}
                    </Typography>
                    <Typography
                        id={props.secondId}
                        className={`${classes.secondTitle} mb-5`}
                    >
                        {props.secondTitle}
                    </Typography>
                </div>
            ) : (
                <Typography id={props.id} className={`${classes.root} mb-5`}>
                    {props.title}
                </Typography>
            )}
        </>
    )
}

export default SCPageHeading
