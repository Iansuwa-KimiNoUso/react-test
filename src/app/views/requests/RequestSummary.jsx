import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
    Typography,
    Grid,
    Box,
    Paper,
    CircularProgress,
} from '@material-ui/core'
import {
    BreadcrumbBackButton,
    SCPageHeading,
    SCButton,
    SCModal,
} from 'app/components'
import _ from 'lodash'
import useTranslation from 'app/hooks/translations'
import { useDispatch, useSelector } from 'react-redux'
import {
    getPendingReviewDetail,
    postRequestStatusDetail,
} from 'app/redux/actions/RequestAction'
import history from 'history.js'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    mainPageHeader: {
        backgroundColor: '#fff',
        TypographyShadow: '0px 4px 15px rgba(0, 0, 0, 0.02)',
        borderRadius: '8px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.08)',
    },
    headerTitleLabel: {
        color: '#008C44',
        fontSize: 24,
        fontWeight: 700,
        marginBottom: '8px',
    },
    buttonStyles: {
        '& .MuiButton-root.Mui-disabled': {
            color: '#fff',
            border: '1px solid #CCC',
            backgroundColor: '#CCC',
        },
    },
}))

export function getTimeDateformat(datetime, key) {
    const splitDateTime = datetime.split(' ')
    let timeDate = ''

    // istanbul ignore if
    if (_.size(splitDateTime) === 2) {
        if (key === 'date') {
            timeDate = splitDateTime[0]
        } else if (key === 'time') {
            timeDate = splitDateTime[1]
        } else {
            timeDate = splitDateTime[1].substring(0, 5) + ' ' + splitDateTime[0]
        }
    } else {
        timeDate = splitDateTime[0]
    }

    return timeDate
}

export const handleClickApprove = (e, setOpenApproveDialog) => {
    e.preventDefault()
    setOpenApproveDialog(true)
}

export const handleApproveClose = (e, setOpenApproveDialog) => {
    setOpenApproveDialog(false)
}

export const handleAcceptApprove = (
    e,
    appID,
    state,
    postRequestStatusDetail,
    Dispatch
) => {
    let listRequestArray = []
    listRequestArray.push({
        requestId: state[0].requestId,
        taxId: state[0].taxId,
        status: state[0].status,
        remarks: state[0].statusRemarks,
    })
    const payload = {
        listRequest: listRequestArray,
        status: 'Approved',
        remarks: '',
    }
    Dispatch(postRequestStatusDetail(payload))
}

export const handleClickReject = (e, setOpenRejectDialog) => {
    e.preventDefault()
    setOpenRejectDialog(true)
}

export const handleRejectClose = (e, setOpenRejectDialog, setRejectReason) => {
    setOpenRejectDialog(false)
    setRejectReason('')
}

export const handleAcceptReject = (
    e,
    appID,
    state,
    rejectReason,
    Dispatch,
    postRequestStatusDetail,
    setRejectReason
) => {
    let listRequestArray = []
    listRequestArray.push({
        requestId: state[0].requestId,
        taxId: state[0].taxId,
        status: state[0].status,
        remarks: state[0].statusRemarks,
    })
    const payload = {
        listRequest: listRequestArray,
        status: 'Rejected',
        remarks: rejectReason,
    }
    Dispatch(postRequestStatusDetail(payload))

    setRejectReason('')
}

export default function RequestSummary(props) {
    const { location } = props
    const classes = useStyles()
    const [rejectReason, setRejectReason] = useState('')
    const [openRejectDialog, setOpenRejectDialog] = useState(false)
    const [openApproveDialog, setOpenApproveDialog] = useState(false)
    const { pendingReviewDetail, isFetchingRequestsStatusDetail } = useSelector(
        (state) => state.allRequests
    )
    const Dispatch = useDispatch()
    const { view_summary_page: translations } = useTranslation()

    const getStatusTranslation = (status) => {
        return _.get(translations, _.snakeCase(status), status)
    }

    const state = pendingReviewDetail
    let paperProps
    let propsDetails
    let status

    if (!_.isEmpty(state)) {
        status = getStatusTranslation(state[0].status)
        paperProps = [
            {
                title: translations.subtitles.request_date,
                data: state[0].requestDate,
            },
            {
                title: translations.subtitles.request_id,
                data: state[0].requestId,
            },
            {
                title: translations.subtitles.status,
                data: getStatusTranslation(state[0].status),
            },
            {
                title: translations.subtitles.result_date,
                data: state[0].statusDate
                    ? getTimeDateformat(state[0].statusDate, 'date')
                    : '-',
            },
            {
                title: translations.subtitles.supplier,
                data: state[0].vendorName,
            },
        ]

        propsDetails = [
            {
                title: translations.total,
                data: parseFloat(state[0].totalAmount)
                    .toFixed(2)
                    .toString()

                    .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                isTotal: true,
            },
            {
                title: translations.advanced_payment,
                data: parseFloat(state[0].advPaymentAmount)
                    .toFixed(2)
                    .toString()

                    .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                isTotal: false,
            },
            {
                title: translations.financing_fees,
                data: parseFloat(state[0].financingFees)
                    .toFixed(2)
                    .toString()

                    .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                isTotal: false,
            },
            {
                title: translations.total_funding_request,
                data: parseFloat(state[0].totalFundingRequest)
                    .toFixed(2)
                    .toString()

                    .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                isTotal: true,
            },
            {
                title: translations.remaining_balance,
                data: parseFloat(state[0].remainingBalance)
                    .toFixed(2)
                    .toString()

                    .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                isTotal: false,
            },
        ]
    }

    useEffect(() => {
        Dispatch(getPendingReviewDetail(location.state))
        if (isFetchingRequestsStatusDetail) {
            setOpenRejectDialog(false)
            setOpenApproveDialog(false)
        }
        // this will only run once the component loads
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetchingRequestsStatusDetail])

    return (
        <>
            {isFetchingRequestsStatusDetail ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                    }}
                >
                    <CircularProgress style={{ color: '#008C44' }} />
                </Box>
            ) : (
                <>
                    {_.isEmpty(state) ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '50vh',
                            }}
                        >
                            <CircularProgress style={{ color: '#008C44' }} />
                        </Box>
                    ) : (
                        <div id="ViewSummaryPage" className="scf_infos m-sm-30">
                            <BreadcrumbBackButton
                                id="viewPageSummary"
                                routeSegments={[
                                    {
                                        name: `${translations.breadcrumbs.viewRequests}`,
                                        path: '',
                                    },
                                    { name: `${state[0].requestId}` },
                                ]}
                                customBackPath={
                                    history.location.pathname ===
                                    '/request/pending-review-summary'
                                        ? '/request/pending-review'
                                        : '/request/approved-rejected'
                                }
                            />
                            <SCPageHeading title={translations.title} />

                            <>
                                <div className={`${classes.mainPageHeader}`}>
                                    <Grid
                                        container
                                        spacing={2}
                                        className="p-5 mb-5"
                                    >
                                        <Grid item md={12} sm={12} xs={12}>
                                            <Typography
                                                className={`${classes.headerTitleLabel}`}
                                            >
                                                {state[0].productName}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: {
                                                        sm: 'block',
                                                        xs: 'block',
                                                        md: 'flex',
                                                    },
                                                }}
                                            >
                                                {paperProps.map((data) => {
                                                    return (
                                                        <Box
                                                            key={data.title}
                                                            sx={{
                                                                marginRight: {
                                                                    xs: 0,
                                                                    sm: 0,
                                                                    md: '100px',
                                                                },
                                                            }}
                                                        >
                                                            <Typography
                                                                style={{
                                                                    fontSize:
                                                                        '16px',
                                                                    marginBottom:
                                                                        '8px',
                                                                }}
                                                            >
                                                                {`${data.title}:`}
                                                            </Typography>
                                                            <Typography
                                                                style={{
                                                                    fontSize:
                                                                        '16px',
                                                                    fontWeight: 700,
                                                                }}
                                                            >
                                                                {data.data}
                                                            </Typography>
                                                        </Box>
                                                    )
                                                })}
                                            </Box>
                                            {status === 'Rejected' ||
                                            status === 'ปฏิเสธ' ? (
                                                <Box sx={{ marginTop: '12px' }}>
                                                    <Typography
                                                        style={{
                                                            fontSize: '16px',
                                                        }}
                                                    >
                                                        {
                                                            translations.rejection_reason
                                                        }
                                                        :
                                                    </Typography>
                                                    <Typography
                                                        style={{
                                                            fontSize: '16px',
                                                            fontWeight: 700,
                                                            wordWrap:
                                                                'break-word',
                                                        }}
                                                    >
                                                        {state[0].statusRemarks}
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <></>
                                            )}
                                        </Grid>
                                    </Grid>
                                </div>
                                <Box
                                    style={{
                                        display: 'flex',
                                        marginTop: '4px',
                                        marginBottom: '16px',
                                    }}
                                >
                                    <Typography
                                        style={{
                                            fontSize: '20px',
                                        }}
                                    >
                                        {translations.customer}:
                                    </Typography>
                                    <Typography
                                        component="span"
                                        style={{
                                            fontWeight: 700,
                                            fontSize: '20px',
                                            marginLeft: '8px',
                                        }}
                                    >
                                        {state[0].customer}
                                    </Typography>
                                </Box>
                                <Paper
                                    style={{
                                        marginBottom: '15px',
                                        boxShadow:
                                            '0px 4px 15px rgba(0, 0, 0, 0.08)',
                                    }}
                                >
                                    <Box sx={{ height: '24px' }} />
                                    <Box sx={{ backgroundColor: '#FAFAFA' }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                height: '60px',
                                                alignItems: 'center',
                                                marginLeft: {
                                                    xs: '10px',
                                                    sm: '10px',
                                                    md: '25px',
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    fontWeight: 700,
                                                    width: '25%',
                                                }}
                                            >
                                                {translations.transaction_id}
                                            </Box>
                                            <Box
                                                sx={{
                                                    fontWeight: 700,
                                                    width: '25%',
                                                }}
                                            >
                                                {translations.maturity_date}
                                            </Box>
                                            <Box
                                                sx={{
                                                    fontWeight: 700,
                                                    width: '25%',
                                                }}
                                            >
                                                {translations.currency}
                                            </Box>
                                            <Box
                                                sx={{
                                                    fontWeight: 700,
                                                    width: '25%',
                                                }}
                                            >
                                                {
                                                    translations.transaction_amount
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                    {state[0].length !== 0 ? (
                                        state[0].transactionDetails.map(
                                            (transaction) => {
                                                return (
                                                    <Box
                                                        key={
                                                            transaction.transactionId
                                                        }
                                                        sx={{
                                                            display: 'flex',
                                                            height: '60px',
                                                            alignItems:
                                                                'center',
                                                            marginLeft: {
                                                                xs: '10px',
                                                                sm: '10px',
                                                                md: '25px',
                                                            },
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                fontSize:
                                                                    '16px',
                                                                width: '25%',
                                                            }}
                                                        >
                                                            {
                                                                transaction.transactionId
                                                            }
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                fontSize:
                                                                    '16px',
                                                                width: '25%',
                                                            }}
                                                        >
                                                            {
                                                                transaction.maturityDate
                                                            }
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                fontSize:
                                                                    '16px',
                                                                width: '25%',
                                                            }}
                                                        >
                                                            {
                                                                transaction.currency
                                                            }
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                fontSize:
                                                                    '16px',
                                                                width: '25%',
                                                            }}
                                                        >
                                                            {parseFloat(
                                                                transaction.amount
                                                            )
                                                                .toFixed(2)
                                                                .toString()
                                                                .replace(
                                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                                    ','
                                                                )}
                                                        </Box>
                                                    </Box>
                                                )
                                            }
                                        )
                                    ) : (
                                        <></>
                                    )}
                                    {propsDetails.map((detail) => {
                                        return detail.isTotal ? (
                                            <Box
                                                key={detail.title}
                                                sx={{
                                                    backgroundColor:
                                                        '#ECF8EEA6',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        height: '60px',
                                                        alignItems: 'center',
                                                        marginLeft: {
                                                            xs: '10px',
                                                            sm: '10px',
                                                            md: '25px',
                                                        },
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            fontSize: '16px',
                                                            width: '25%',
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        {detail.title}
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            fontSize: '16px',
                                                            width: '25%',
                                                        }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            fontSize: '16px',
                                                            width: '25%',
                                                        }}
                                                    >
                                                        {state[0].length !== 0
                                                            ? state[0]
                                                                  .transactionDetails[0]
                                                                  .currency
                                                            : null}
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            fontSize: '16px',
                                                            width: '25%',
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        {detail.data}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ) : (
                                            <Box
                                                key={detail.title}
                                                sx={{
                                                    display: 'flex',
                                                    height: '60px',
                                                    alignItems: 'center',
                                                    marginLeft: {
                                                        xs: '10px',
                                                        sm: '10px',
                                                        md: '25px',
                                                    },
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: '25%',
                                                    }}
                                                >
                                                    {detail.title}
                                                </Box>
                                                <Box
                                                    sx={{
                                                        width: '25%',
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        width: '25%',
                                                    }}
                                                >
                                                    {state[0].length !== 0
                                                        ? state[0]
                                                              .transactionDetails[0]
                                                              .currency
                                                        : null}
                                                </Box>
                                                <Box
                                                    sx={{
                                                        width: '25%',
                                                    }}
                                                >
                                                    {detail.data}
                                                </Box>
                                            </Box>
                                        )
                                    })}
                                </Paper>
                                <Box
                                    className={classes.buttonStyles}
                                    sx={{
                                        marginBottom: '150px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: '90px',
                                        justifyContent: 'right',
                                        spacing: '20px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            marginRight: {
                                                xs: '7.5px',
                                                md: '15px',
                                            },
                                            width: {
                                                xs: '50%',
                                                sm: 'auto',
                                                md: 'auto',
                                            },
                                        }}
                                    >
                                        <SCButton
                                            outlined
                                            disabled={
                                                status === 'Approved' ||
                                                status === 'อนุมัติ' ||
                                                status === 'Rejected' ||
                                                status === 'ปฏิเสธ'
                                                    ? true
                                                    : false
                                            }
                                            text={translations.reject}
                                            buttonClick={(e) =>
                                                handleClickReject(
                                                    e,
                                                    setOpenRejectDialog
                                                )
                                            }
                                            style={{ fontWeight: 700 }}
                                            color={
                                                status === 'Approved' ||
                                                status === 'อนุมัติ' ||
                                                status === 'Rejected' ||
                                                status === 'ปฏิเสธ'
                                                    ? '#FFFFFF'
                                                    : '#008C44'
                                            }
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            marginLeft: {
                                                xs: '7.5px',
                                                md: '15px',
                                            },
                                            width: {
                                                xs: '50%',
                                                sm: 'auto',
                                                md: 'auto',
                                            },
                                        }}
                                    >
                                        <SCButton
                                            contained
                                            disabled={
                                                status === 'Approved' ||
                                                status === 'อนุมัติ' ||
                                                status === 'Rejected' ||
                                                status === 'ปฏิเสธ'
                                                    ? true
                                                    : false
                                            }
                                            text={translations.approve}
                                            buttonClick={(e) =>
                                                handleClickApprove(
                                                    e,
                                                    setOpenApproveDialog
                                                )
                                            }
                                            style={{ fontWeight: 700 }}
                                        />
                                    </Box>
                                </Box>
                                <SCModal
                                    id="RejectModal"
                                    handleCancel={(e) =>
                                        handleRejectClose(
                                            e,
                                            setOpenRejectDialog,
                                            setRejectReason
                                        )
                                    }
                                    handleOk={(e) =>
                                        handleAcceptReject(
                                            e,
                                            'props.appID',
                                            state,
                                            rejectReason,
                                            Dispatch,
                                            postRequestStatusDetail,
                                            setRejectReason
                                        )
                                    }
                                    openDialog={openRejectDialog}
                                    title={translations.reject_title}
                                    content={''}
                                    placeholder={translations.reason}
                                    charMaxLimit={200}
                                    setReason={setRejectReason}
                                    okDisabled={rejectReason ? false : true}
                                    cancel={translations.return}
                                    ok={translations.reject}
                                    cancelWidth={170}
                                    okWidth={170}
                                />
                                <SCModal
                                    id="ApproveModal"
                                    handleCancel={(e) =>
                                        handleApproveClose(
                                            e,
                                            setOpenApproveDialog
                                        )
                                    }
                                    handleOk={(e) =>
                                        handleAcceptApprove(
                                            e,
                                            'props.appID',
                                            state,
                                            postRequestStatusDetail,
                                            Dispatch
                                        )
                                    }
                                    openDialog={openApproveDialog}
                                    title={translations.approve_title}
                                    content={''}
                                    cancel={translations.return}
                                    ok={translations.approve}
                                    cancelWidth={170}
                                    okWidth={170}
                                />
                            </>
                        </div>
                    )}
                </>
            )}
        </>
    )
}
