import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import ApprovedRejectedTable from './ApprovedRejectedTable'
import { SCPageHeading } from 'app/components'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import {
    getRequestsApprovedRejected,
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
        if (_.isEmpty(errorMsg)) {
            setShowMsg(true)
            setErrorMsg(translations.select_transactions)
        }
    } else {
        let payload = {
            listRequest: JSON.parse(
                localStorage.getItem('selectedApproveRejectExport')
            ),
            type: 'excel',
        }

        Dispatch(downloadRequests(payload))
    }
}

export default function ApprovedRejected() {
    const classes = useStyles()
    const {
        requestsApprovedRejected,
        isFetchingRequestsApprovedRejected,
        requestsDownload,
        isFetchingRequestsDownload,
    } = useSelector((state) => state.allRequests)
    const { request_approved_rejected: translations } = useTranslation()
    const Dispatch = useDispatch()
    const [errorMsg, setErrorMsg] = useState('')
    const [showMsg, setShowMsg] = useState(true)
    const [requestData, setRequestData] = useState([])

    useEffect(() => {
        let payload = {
            status: 'approved',
        }
        Dispatch(getRequestsApprovedRejected(payload))
        // this will only run once the component loads
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestsDownload])

    const getStatusTranslation = (status) => {
        return _.get(translations, _.snakeCase(status), status)
    }

    // istanbul ignore next
    useEffect(() => {
        if (!_.isEmpty(requestsApprovedRejected)) {
            requestsApprovedRejected.map((transaction) => {
                transaction.status = getStatusTranslation(transaction.status)

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

            setRequestData(requestsApprovedRejected)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requestsApprovedRejected, isFetchingRequestsApprovedRejected])

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
                        <Button
                            disabled={isFetchingRequestsDownload}
                            id="DownloadAllBtn"
                            className={classes.outlined}
                            onClick={(e) =>
                                handleClickDownload(
                                    e,
                                    showMsg,
                                    errorMsg,
                                    setShowMsg,
                                    setErrorMsg,
                                    translations,
                                    Dispatch,
                                    downloadRequests
                                )
                            }
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

            <div className={classes.tableContainer}>
                {!_.isEmpty(errorMsg) && showMsg && (
                    <Typography className={`${classes.textErrorMsg}`}>
                        {errorMsg}
                    </Typography>
                )}

                <ApprovedRejectedTable
                    transactions={requestData}
                    isFetching={isFetchingRequestsApprovedRejected}
                    setErrorMsg={setErrorMsg}
                    setShowMsg={setShowMsg}
                />
            </div>
        </div>
    )
}
