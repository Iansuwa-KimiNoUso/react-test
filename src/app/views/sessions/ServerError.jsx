import React from 'react'
import { Card, Grid, Button } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import history from 'history.js'
import clsx from 'clsx'
import useTranslation from 'app/hooks/translations'
import LayoutTopbarMenu from './home/layout/Header'
import serverErrorImg from 'app/assets/images/icons/server_error.svg'
import _ from 'lodash'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    cardHolder: {
        background: '#fff',
    },
    card: {
        width: '100%',
        margin: '1rem',
        color: '#666',
        boxShadow: 'none',
    },
    logo: {
        width: 102,
    },
    btnSCprimary: {
        fontSize: '16px',
        width: '100%',
        height: '48px',
        borderRadius: '30px',
        fontWeight: 'bold',
        boxShadow: 'none',
        maxWidth: '360px',
    },
}))

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText('#008C44'),
        backgroundColor: '#008C44',
        '&:hover': {
            backgroundColor: '#00813e',
        },
    },
}))(Button)

const ServerError = (props) => {
    const translation = useTranslation()
    const classes = useStyles()
    const { location } = props
    let getSetPath = ''
    let getSetTitle = ''
    let getSetBody = ''
    if (location && location.state && location.state.error) {
        getSetPath = _.get(location, 'state.path', '')
        getSetTitle = _.get(location, 'state.error.title', '')
        getSetBody = _.get(location, 'state.error.body', '')
    }

    let backLink = ''
    let pathVal = !_.isEmpty(getSetPath) ? getSetPath : 'applications'

    backLink = '/' + pathVal

    window.onload = () => {
        if (pathVal) {
            history.push(backLink)
        }
        return
    }

    return (
        <div>
            <LayoutTopbarMenu />

            <div
                className={clsx(
                    'flex justify-center items-center min-h-full-screen',
                    classes.cardHolder
                )}
            >
                <Card className={classes.card}>
                    <Grid container>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className="pb-8 flex justify-center items-center h-full">
                                <img
                                    className={classes.logo}
                                    src={serverErrorImg}
                                    alt=""
                                />
                            </div>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div className="pt-0x pr-8x pb-8x pl-8x h-full bg-light-grayxxx relative">
                                <div className="pb-2 text-center">
                                    <h1 className="text-center">
                                        {!_.isEmpty(getSetTitle)
                                            ? getSetTitle
                                            : /* istanbul ignore next */
                                              translation.error.server_error
                                                  .title}
                                    </h1>
                                    <p className="pt-0x pr-8 pb-0 pl-8 text-center">
                                        {!_.isEmpty(getSetBody)
                                            ? getSetBody
                                            : /* istanbul ignore next */
                                              translation.error.server_error
                                                  .content}
                                    </p>
                                </div>
                                <div className="flexx flex-wrapx items-center mb-4">
                                    <div className="relative text-center">
                                        <ColorButton
                                            className={classes.btnSCprimary}
                                            variant="contained"
                                            color="primary"
                                            href={backLink}
                                        >
                                            {translation.error.button_back}
                                        </ColorButton>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        </div>
    )
}

export default ServerError
