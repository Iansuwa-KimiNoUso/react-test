import React, { useEffect } from 'react'
import { Grid, Typography, Box } from '@material-ui/core'
import { SCButton } from 'app/components'
import LandingPagePng from 'app/assets/images/LandingPage.png'
import { makeStyles } from '@material-ui/core/styles'
import { getNewSession } from 'app/redux/actions/NewSessionActions'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import useTranslation from 'app/hooks/translations'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    gridItem: {
        marginLeft: 132,
        marginTop: 291,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 50,
            marginTop: 200,
            marginBottom: 200,
        },
    },
    gridItemTypo: {
        width: '270px',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        lineHeight: '36px',
        color: '#000',
        fontStyle: 'Roboto',
    },
    gridItemButton: {
        marginLeft: 24,
        '& button': {
            fontWeight: 700,
            fontFamily: 'Anuyart',
            fontSize: 16,
            [theme.breakpoints.down('sm')]: {
                width: 171,
            },
        },
    },
    gridItemImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
}))

const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET, REACT_APP_NAME } =
    process.env

const LoginLandingPage = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const translation = useTranslation()
    const { apiLoading, newSessions } = useSelector(
        (state) => state.sessionInfo
    )

    window.history.pushState(null, null, window.location.href)
    window.onpopstate = function () {
        window.history.pushState(null, null, window.location.href)
        window.location.assign(window.location.href)
        window.history.go(1)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
            appName: REACT_APP_NAME,
            clientID: REACT_APP_CLIENT_ID,
            clientSecret: REACT_APP_CLIENT_SECRET,
        }

        dispatch(getNewSession(payload))
    }

    useEffect(() => {
        if (!_.isEmpty(newSessions)) {
            window.location.href = `${process.env.REACT_APP_COMMON_URL}session/signin?code=ascend-nano&sid=${newSessions.sessionID}`
        }
    }, [newSessions])

    return (
        <Grid container>
            <Grid item md={6} sm={12} xs={12}>
                <Box
                    id="landingPageBoxItem"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        width: { lg: '50%' },
                        height: {
                            xs: '50vh',
                            sm: '50vh',
                            md: '100vh',
                            lg: '100vh',
                        },
                    }}
                >
                    <Box
                        sx={{
                            textAlign: {
                                sm: 'center',
                                xs: 'center',
                                lg: 'left',
                            },
                        }}
                    >
                        <Typography
                            id="landingPageWelcome"
                            className={classes.gridItemTypo}
                        >
                            {translation.landing.welcome_content}
                        </Typography>
                        <SCButton
                            id="FENanoLogin"
                            contained
                            text={translation.landing.welcome_button}
                            style={{ padding: '0 25px' }}
                            disabled={apiLoading}
                            buttonClick={(e) => handleSubmit(e)}
                        />
                    </Box>
                </Box>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
                <Box
                    id="landingPageBoxImg"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        width: { lg: '100%' },
                        height: {
                            xs: '50vh',
                            sm: '50vh',
                            md: '100vh',
                            lg: '100vh',
                        },
                    }}
                >
                    <img
                        id="landingPageNanoImg"
                        className={classes.gridItemImage}
                        src={LandingPagePng}
                        alt="FE Nano"
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default LoginLandingPage
