import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Toolbar, AppBar, Container } from '@material-ui/core'
import clsx from 'clsx'
import useTranslation from 'app/hooks/translations'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    footer: {
        height: '168px',
        padding: '0',
        minHeight: 'var(--topbar-height)',
        '@media (max-width: 499px)': {
            display: 'table',
            width: '100%',
            minHeight: 'auto',
            padding: '1rem 0',
            textAlign: 'center',
            '& .container': {
                flexDirection: 'column !important',
                '& a': {
                    margin: '0 0 16px !important',
                },
            },
        },
    },
    appbar: {
        zIndex: 96,
        background: '#008C44'
    },
}))

const Footer = () => {
    const translation = useTranslation()
    const classes = useStyles()
    // const date = new Date().getFullYear();

    return (
        <AppBar 
            color="primary"
            position="static"
            className={classes.appbar}
        >
            <Container maxWidth="lg">
                <Toolbar className={clsx('flex items-center', classes.footer)}>
                    <div className="flex items-center container w-full">
                        <div className="items-center m-0">
                            <h3 className="text-white mb-3">
                                {translation.footer.logo}
                            </h3>
                            <p className="text-14 m-0">
                                {translation.footer.copy}
                            </p>
                        </div>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Footer
