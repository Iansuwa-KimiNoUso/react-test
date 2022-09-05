import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import useTranslation from 'app/hooks/translations'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    topbar: {
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 96,
        transition: 'all 0.3s ease',
        background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))',
        '& .topbar-hold': {
            backgroundColor: '#008C44',
            height: 80,
        },
        '& .fixed': {
            height: 80,
        },
        '& .sticky': {
            height: 50,
        },
    },
    userMenu: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 24,
        padding: 4,
        '& span': {
            margin: '0 8px',
        },
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        minWidth: 185,
    },
    title: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '18px !important',
        },
    },
}))

const Header = () => {
    const translation = useTranslation()
    const classes = useStyles()
    let timeout
    let scroll = 0

    window.onscroll = () => {
        if (timeout) {
            clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
            if (scroll > 10 && window.scrollY > 10) {
                document.getElementById('header').classList.add('sticky')
                document
                    .getElementById('stickyLogo')
                    .classList.remove('text-20')
            } else {
                document.getElementById('header').classList.remove('sticky')
                document.getElementById('stickyLogo').classList.add('text-20')
            }

            scroll = window.scrollY
        }, 10)
    }

    return (
        <div className={classes.topbar}>
            <div
                id="header"
                className={clsx({ 'topbar-hold': true, fixed: true })}
            >
                <div className="flex justify-between items-center h-full">
                    <Container maxWidth="lg">
                        <div className="flex">
                            <div className="flex items-center">
                                <span
                                    id="stickyLogo"
                                    className={clsx(
                                        'text-white text-20 ml-2x font-bold',
                                        classes.title
                                    )}
                                >
                                    {translation.header.logo}
                                </span>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Header)
