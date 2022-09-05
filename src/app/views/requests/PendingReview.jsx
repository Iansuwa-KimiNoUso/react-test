import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import PendingReviewTable from './PendingReviewTable'
import { SCPageHeading } from 'app/components'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import {
    getRequestsPendingReview,
    postRequestStatusDetail,
    downloadRequests,
} from 'app/redux/actions/RequestAction'
import useTranslation from 'app/hooks/translations'
import {
    Box,
    CircularProgress,
    Button,
    Typography,
    Grid,
} from '@material-ui/core'
import { SCButton, SCModal } from 'app/components'
import DownloadIcon from 'app/assets/images/icons/downloadExport.png'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    tableContainer: {
        minHeight: '539px',
        marginTop: '30px',
        '& .MuiPaper-elevation1': {
            boxShadow: 'none',
        },
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
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    outlined: {
        '& span': {
            color: '#1E4538',
        },
        fontSize: '16px',
        fontWeight: '700',
        height: 48,
        width: 170,
        border: '1px solid #1E4538',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.04)',
        borderRadius: '48px',
        marginLeft: '20px',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            padding: 0,
        },
    },
    colorgreen: {
        color: '#1E4538',
        width: '24px !important',
        height: '24px !important',
        marginLeft: 10,
    },
    textErrorMsg: {
        textAlign: 'right',
        color: '#E94933',
        fontSize: '14px',
        marginTop: '-10px',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
        },
    },
}))

export const handleClickApprove = (
    e, 
    showMsg, 
    errorMsg, 
    translations, 
    setShowMsg, 
    setErrorMsg, 
    setOpenApproveDialog
) => {
    e.preventDefault()

    if (showMsg) {
        // istanbul ignore else
        if (_.isEmpty(errorMsg)) {
            setShowMsg(true)
            setErrorMsg(translations.select_transactions)
        }
    } else {
        setOpenApproveDialog(true)
    }
}

export const handleApproveClose = (e, setOpenApproveDialog) => {
    setOpenApproveDialog(false)
}

export const handleAcceptApprove = (e, Dispatch, postRequestStatusDetail) => {
    const payload = {
        listRequest: JSON.parse(
            localStorage.getItem('selectedPendingReqs')
        ),
        status: 'Approved',
        remarks: '',
    }
    Dispatch(postRequestStatusDetail(payload))
}

export const handleClickReject = (
    e,
    showMsg,
    errorMsg,
    translations,
    setShowMsg,
    setErrorMsg,
    setOpenRejectDialog
) => {
    e.preventDefault()

    if (showMsg) {
        // istanbul ignore else
        if (_.isEmpty(errorMsg)) {
            setShowMsg(true)
            setErrorMsg(translations.select_transactions)
        }
    } else {
        setOpenRejectDialog(true)
    }
}

export const handleRejectClose = (e, setOpenRejectDialog, setRejectReason) => {
    setOpenRejectDialog(false)
    setRejectReason('')
}

export const handleAcceptReject = (
    e, 
    rejectReason, 
    Dispatch, 
    postRequestStatusDetail, 
    setRejectReason
) => {
    const payload = {
        listRequest: JSON.parse(
            localStorage.getItem('selectedPendingReqs')
        ),
        status: 'Rejected',
        remarks: rejectReason,
    }
    Dispatch(postRequestStatusDetail(payload))

    setRejectReason('')
}

export const handleClickDownload = (
    e,
    showMsg,
    errorMsg,
    setShowMsg,
    setErrorMsg,
    translations,
    Dispatch,
    downloadRequests,
) => {
    e.preventDefault()

    if (showMsg) {
        // istanbul ignore else
        if (_.isEmpty(errorMsg)) {
            setShowMsg(true)
            setErrorMsg(translations.select_transactions)
        }
    } else {
        let payload = {
            listRequest: JSON.parse(
                localStorage.getItem('selectedPendingReqsExport')
            ),
            type: 'excel',
        }

        Dispatch(downloadRequests(payload))
    }
}

export default function PendingReview() {
    const classes = useStyles()
    const {
        requestsPendingReview,
        isFetchingRequestsPendingReview,
        requestsStatusDetail,
        isFetchingRequestsStatusDetail,
        requestsDownload,
        isFetchingRequestsDownload,
    } = useSelector((state) => state.allRequests)
    const {
        request_pending_review: translations,
        request_pop_up: translations_popup,
    } = useTranslation()
    const Dispatch = useDispatch()
    const [rejectReason, setRejectReason] = useState('')
    const [openRejectDialog, setOpenRejectDialog] = useState(false)
    const [openApproveDialog, setOpenApproveDialog] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [showMsg, setShowMsg] = useState(true)
    const [requestData, setRequestData] = useState([])

    // istanbul ignore next
    useEffect(() => {
        let payload = {
            status: 'pending_review',
        }
        Dispatch(getRequestsPendingReview(payload))
        // this will only run once the component loads
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestsStatusDetail, requestsDownload])

    // istanbul ignore next
    useEffect(() => {
        if (!_.isEmpty(requestsStatusDetail)) {
            setOpenRejectDialog(false)
            setOpenApproveDialog(false)
            setShowMsg(true)
        }
    }, [requestsStatusDetail])

    // istanbul ignore next
    useEffect(() => {
        setShowMsg(true)
        setErrorMsg('')
    }, [requestsDownload])

    // istanbul ignore next
    useEffect(() => {
        if (!_.isEmpty(requestsPendingReview)) {
            requestsPendingReview.map((transaction) => {
                transaction.remainingBalance = parseFloat(
                    transaction.remainingBalance
                )
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

                transaction.totalFundingRequest = parseFloat(
                    transaction.totalFundingRequest
                )
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

                return transaction
            })

            setRequestData(requestsPendingReview)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestsPendingReview])

    return (
        <div id="PendingReviewPage" className="scf_infos m-sm-30">
            <SCPageHeading title={translations.title} />

            <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                    <Box
                        className={classes.buttonClass}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'right',
                            width: '600px',
                            margin: '0 0 0 auto',
                        }}
                    >
                        <SCButton
                            id="TNCSReject"
                            outlined
                            text={translations.reject}
                            style={{ marginRight: 20, fontWeight: 700 }}
                            width={170}
                            buttonClick={(e) => handleClickReject(
                                e,
                                showMsg,
                                errorMsg,
                                translations,
                                setShowMsg,
                                setErrorMsg,
                                setOpenRejectDialog
                            )}
                            disabled={
                                openRejectDialog ||
                                isFetchingRequestsStatusDetail ||
                                isFetchingRequestsDownload
                            }
                        />
                        <SCButton
                            id="TNCSApprove"
                            contained
                            text={translations.approve}
                            style={{ fontWeight: 700 }}
                            width={170}
                            buttonClick={(e) => handleClickApprove(
                                e,
                                showMsg,
                                errorMsg,
                                translations,
                                setShowMsg,
                                setErrorMsg,
                                setOpenApproveDialog
                            )}
                            disabled={
                                openApproveDialog ||
                                isFetchingRequestsStatusDetail ||
                                isFetchingRequestsDownload
                            }
                        />

                        <Button
                            disabled={
                                isFetchingRequestsDownload ||
                                isFetchingRequestsStatusDetail
                            }
                            id="DownloadAllBtn"
                            className={classes.outlined}
                            onClick={(e) => handleClickDownload(
                                e,
                                showMsg,
                                errorMsg,
                                setShowMsg,
                                setErrorMsg,
                                translations,
                                Dispatch,
                                downloadRequests,
                            )}
                        >
                            {translations.export}{' '}
                            {isFetchingRequestsDownload ? (
                                <CircularProgress
                                    className={classes.colorgreen}
                                />
                            ) : (
                                <img
                                    src={DownloadIcon}
                                    alt={translations.export}
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        marginLeft: 10,
                                    }}
                                />
                            )}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <SCModal
                id="RejectModal"
                handleCancel={(e) => handleRejectClose(e, setOpenRejectDialog, setRejectReason)}
                handleOk={(e) => handleAcceptReject(
                    e,
                    rejectReason,
                    Dispatch,
                    postRequestStatusDetail,
                    setRejectReason
                )}
                openDialog={openRejectDialog}
                title={translations_popup.reject_title}
                content={''}
                placeholder={translations_popup.reason}
                charMaxLimit={200}
                setReason={setRejectReason}
                okDisabled={rejectReason ? false : true}
                cancel={translations_popup.return}
                ok={translations_popup.reject}
                cancelWidth={170}
                okWidth={170}
            />
            <SCModal
                id="ApproveModal"
                handleCancel={(e) => handleApproveClose(e, setOpenApproveDialog)}
                handleOk={(e) => handleAcceptApprove(e, Dispatch, postRequestStatusDetail)}
                openDialog={openApproveDialog}
                title={translations_popup.approve_title}
                content={''}
                cancel={translations_popup.return}
                ok={translations_popup.approve}
                cancelWidth={170}
                okWidth={170}
            />

            <div className={classes.tableContainer}>
                {!_.isEmpty(errorMsg) && showMsg && (
                    <Typography className={`${classes.textErrorMsg}`}>
                        {errorMsg}
                    </Typography>
                )}

                <PendingReviewTable
                    transactions={requestData}
                    isFetching={isFetchingRequestsPendingReview}
                    setErrorMsg={setErrorMsg}
                    setShowMsg={setShowMsg}
                    taxId={
                        !_.isEmpty(requestsPendingReview) &&
                        requestsPendingReview[0].taxId
                    }
                />
            </div>
        </div>
    )
}
