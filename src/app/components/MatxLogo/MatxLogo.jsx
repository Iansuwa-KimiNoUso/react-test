import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import useTranslation from 'app/hooks/translations'

const { REACT_APP_LANGUAGE: lang } = process.env

const useStyles = makeStyles(({ palette, ...theme }) => ({
    root: {
        color: '#fff',
        fontSize: '16px',
        textTransform: 'uppercase',
        fontWeight: 700,
    },
}))

const MatxLogo = ({ className }) => {
    const translation = useTranslation()

    const classes = useStyles()

    const logo = () => {
        if (lang === 'th') {
            let logoSplit = translation.header.logo.split(' ')
            return (
                <span
                    dangerouslySetInnerHTML={{
                        __html: logoSplit.join('<br />'),
                    }}
                ></span>
            )
        }
        return translation.header.logo
    }

    return (
        <Typography variant="body1" className={classes.root}>
            {logo()}
        </Typography>
    )
}

export default MatxLogo
