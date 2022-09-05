import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import useTranslation from 'app/hooks/translations'
import { SCPaper, SCButton, SCModal } from 'app/components'
import { Typography, Grid, Box } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
    approveApplicationSummary,
    rejectApplicationSummary,
    withdrawApplicationSummary,
} from 'app/redux/actions/ApplicationSummaryActions'
import _ from 'lodash'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    detailsContainer: {
        padding: '24px 24px 50px',
        borderRadius: 8,
    },
    detailsValue: {
        fontWeight: 700,
    },
    buttonClass: {
        '& .Mui-disabled': {
            color: '#fff',
            backgroundColor: '#CCC',
            border: '1px solid #CCC',
        },
        '& .Mui-disabled span': { color: '#fff' },
        '& .MuiButton-root:hover.Mui-disabled': {
            backgroundColor: '#CCC',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '10px auto',
            display: 'block',
            textAlign: 'center',
            '& #TNCWithdraw': {
                textAlign: 'center',
                margin: '0 auto !important',
            },
            '& #TNCReject': {
                margin: '10px auto 20px !important',
                display: 'block',
            },
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
}))

export function getTimeDateformat(datetime) {
    const splitDateTime = datetime.split(' ')
    let timeDate = ''

    if (_.size(splitDateTime) === 2) {
        timeDate = splitDateTime[1].substring(0, 5) + ' ' + splitDateTime[0]
    } else {
        timeDate = splitDateTime[0]
    }

    return timeDate
}

const TncAndConsentSummary = (props) => {
    const classes = useStyles()
    const translation = useTranslation()
    const [openRejectDialog, setOpenRejectDialog] = useState(false)
    const [openApproveDialog, setOpenApproveDialog] = useState(false)
    const [btnStatusDisable, setBtnStatusDisable] = useState(false)
    const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false)
    const [withdrawStatusDisable, setWithdrawStatusDisable] = useState(false)

    const isApprovedOrRejected = _.includes(
        ['Approved', 'Rejected', 'Withdrawn'],
        props.appStatus
    )

    const isWithdraw = _.includes(['Withdrawn'], props.appStatus)

    const dispatch = useDispatch()
    const { tncConsent } = translation.pages.supplyChainFinanceRegister
    const { downloadDocsLoading } = useSelector(
        (state) => state.appDownloadDocs
    )
    const {
        loadingApprove,
        appSummaryApprove,
        loadingReject,
        appSummaryReject,
        loadingWithDraw,
        appSummaryWithdraw,
    } = useSelector((state) => state.applicationSummary)

    const handleClickApprove = (e) => {
        e.preventDefault()
        setOpenApproveDialog(true)
    }

    const handleApproveClose = (e) => {
        setOpenApproveDialog(false)
    }

    const handleAcceptApprove = (e, appID) => {
        const payload = {
            applicationId: appID,
        }
        dispatch(approveApplicationSummary(payload))
    }

    const handleClickReject = (e) => {
        e.preventDefault()
        setOpenRejectDialog(true)
    }

    const handleRejectClose = (e) => {
        setOpenRejectDialog(false)
    }

    const handleAcceptReject = (e, appID) => {
        const payload = {
            applicationId: appID,
        }
        dispatch(rejectApplicationSummary(payload))
    }

    const handleClickWithdraw = (e) => {
        e.preventDefault()
        setOpenWithdrawDialog(true)
    }

    const handleWithdrawClose = (e) => {
        setOpenWithdrawDialog(false)
    }

    const handleAcceptWithdraw = (e, appID) => {
        const payload = {
            applicationId: appID,
        }
        dispatch(withdrawApplicationSummary(payload))
    }

    useEffect(() => {
        if (!_.isEmpty(appSummaryApprove)) {
            setOpenApproveDialog(false)

            if (appSummaryApprove.code === 200) {
                setBtnStatusDisable(true)
            }
        }
    }, [appSummaryApprove])

    useEffect(() => {
        if (!_.isEmpty(appSummaryReject)) {
            setOpenRejectDialog(false)

            if (appSummaryReject.code === 200) {
                setBtnStatusDisable(true)
            }
        }
    }, [appSummaryReject])

    useEffect(() => {
        if (!_.isEmpty(appSummaryWithdraw)) {
            setOpenWithdrawDialog(false)

            if (appSummaryWithdraw.response === 'Success') {
                setWithdrawStatusDisable(true)
            }
        }
    }, [appSummaryWithdraw])

    return (
        <>
            <SCPaper
                id="SCTncAndConsentInformationSummary"
                marginBottom={props.marginBottom}
                title={tncConsent.title}
            >
                <Grid
                    container
                    id="SCTncAndConsentInformationSummary_ColumnedInfo"
                >
                    <Grid item xs={12} md={12}>
                        <Typography
                            className={classes.detailsTitle}
                            variant="subtitle1"
                        >
                            {tncConsent.subtitle}:
                        </Typography>

                        <Typography
                            className={classes.detailsValue}
                            variant="subtitle1"
                        >
                            {getTimeDateformat(props.item)}
                        </Typography>
                    </Grid>
                </Grid>
            </SCPaper>
            <Grid container id="SCTncAndConsentInformationSummaryButton">
                <Grid item xs={12} md={6}>
                    <Box
                        className={classes.buttonClass}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'left',
                            width: '200px',
                            margin: '32px auto 60px 0',
                        }}
                    >
                        <SCButton
                            id="TNCWithdraw"
                            outlined
                            text={tncConsent.withdraw}
                            style={{ marginRight: 20 }}
                            width={170}
                            buttonClick={(e) => handleClickWithdraw(e)}
                            disabled={
                                openWithdrawDialog ||
                                downloadDocsLoading ||
                                isWithdraw ||
                                btnStatusDisable ||
                                loadingWithDraw ||
                                withdrawStatusDisable
                            }
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        className={classes.buttonClass}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'right',
                            width: '380px',
                            margin: '32px 0 60px auto',
                        }}
                    >
                        <SCButton
                            id="TNCReject"
                            outlined
                            text={tncConsent.reject}
                            style={{ marginRight: 20 }}
                            width={170}
                            buttonClick={(e) => handleClickReject(e)}
                            disabled={
                                openRejectDialog ||
                                downloadDocsLoading ||
                                loadingApprove ||
                                loadingReject ||
                                isApprovedOrRejected ||
                                btnStatusDisable ||
                                loadingWithDraw ||
                                withdrawStatusDisable
                            }
                        />
                        <SCButton
                            id="TNCApprove"
                            contained
                            text={tncConsent.approve}
                            width={170}
                            buttonClick={(e) => handleClickApprove(e)}
                            disabled={
                                openApproveDialog ||
                                downloadDocsLoading ||
                                loadingApprove ||
                                loadingReject ||
                                isApprovedOrRejected ||
                                btnStatusDisable ||
                                loadingWithDraw ||
                                withdrawStatusDisable
                            }
                        />
                    </Box>
                </Grid>
            </Grid>
            <SCModal
                id="RejectModal"
                handleCancel={handleRejectClose}
                handleOk={(e) => handleAcceptReject(e, props.appID)}
                openDialog={openRejectDialog}
                title={tncConsent.rejectTitle}
                content={''}
                cancel={tncConsent.return}
                ok={tncConsent.popUpReject}
                cancelWidth={170}
                okWidth={170}
            />
            <SCModal
                id="ApproveModal"
                handleCancel={handleApproveClose}
                handleOk={(e) => handleAcceptApprove(e, props.appID)}
                openDialog={openApproveDialog}
                title={tncConsent.approveTitle}
                content={''}
                cancel={tncConsent.return}
                ok={tncConsent.popUpApprove}
                cancelWidth={170}
                okWidth={170}
            />
            <SCModal
                id="WithdrawModal"
                handleCancel={handleWithdrawClose}
                handleOk={(e) => handleAcceptWithdraw(e, props.appID)}
                openDialog={openWithdrawDialog}
                title={tncConsent.withdrawTitle}
                content={''}
                cancel={tncConsent.return}
                ok={tncConsent.withdraw}
                cancelWidth={170}
                okWidth={170}
            />
        </>
    )
}

export default TncAndConsentSummary
