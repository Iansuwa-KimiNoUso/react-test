import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import useTranslation from 'app/hooks/translations'
import { useDispatch, useSelector } from 'react-redux'
import { SCPageHeading, MatxLoading, BackButton } from 'app/components'
import CompanyDetailsSummary from './summary/CompanyDetailsSummary'
import PersonalDetailsSummary from './summary/PersonalDetailsSummary'
import ShareholderDetailsSummary from './summary/ShareholderDetailsSummary'
import BankLoanInformationSummary from './summary/BankLoanInformationSummary'
import UploadedDocumentsSummary from './summary/UploadedDocumentsSummary'
import TncAndConsentSummary from './summary/TncAndConsentSummary'
import { getApplicationSummary } from 'app/redux/actions/ApplicationSummaryActions'
import _ from 'lodash'
import history from 'history.js'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    appSummaryHeaderContainer: {
        justifyContent: 'space-between',
    },
}))

const AscendNanoApplicationSummary = (props) => {
    const classes = useStyles()
    const translation = useTranslation()
    const [showLoading, setShowLoading] = useState(true)
    const [appID, setAppID] = useState('')
    const dispatch = useDispatch()
    const { location } = props

    const { applicationSummary } = useSelector(
        (state) => state.applicationSummary
    )

    useEffect(() => {
        const stateAppID = _.get(location, 'state.appID')

        if (!_.isEmpty(stateAppID)) {
            if (appID !== stateAppID) {
                setAppID(stateAppID)
            }
        } else {
            history.push('/applications')
        }
    }, [appID, location])

    useEffect(() => {
        if (!_.isEmpty(applicationSummary) && !_.isEmpty(appID)) {
            setShowLoading(false)
        } else {
            const getAppIDVal =
                location && location.state && !_.isEmpty(location.state.appID)
                    ? location.state.appID
                    : appID
            dispatch(getApplicationSummary(getAppIDVal))
        }
    }, [applicationSummary, appID, location, dispatch])

    return (
        <div id="ApplicationSummaryPage" className="scf_infos m-sm-30">
            {!showLoading ? (
                <>
                    <div
                        id="ApplicationSummaryContainer"
                        className={`flex ${classes.appSummaryHeaderContainer}`}
                    >
                        <SCPageHeading
                            id="ApplicationSummaryTitle"
                            title={`${translation.breadcrumbs.application_summary}`}
                            secondId="ApplicationSummarySecondTitle"
                            secondTitle={`${translation.breadcrumbs.applicationID}: ${appID}`}
                        />
                        <BackButton customPath="/applications" height="35px" />
                    </div>

                    {applicationSummary.application && (
                        <CompanyDetailsSummary
                            marginBottom={15}
                            item={{
                                ..._.get(
                                    applicationSummary,
                                    'application[0]',
                                    {}
                                ).companyDetails,
                                vendorCode: _.get(
                                    applicationSummary,
                                    'application[0].vendorCode'
                                ),
                            }}
                        />
                    )}

                    {applicationSummary.application && (
                        <PersonalDetailsSummary
                            marginBottom={15}
                            item={_.get(
                                applicationSummary,
                                'application[0].personalDetails',
                                {}
                            )}
                        />
                    )}

                    {applicationSummary.application && (
                        <ShareholderDetailsSummary
                            marginBottom={15}
                            item={_.get(
                                applicationSummary,
                                'application[0].shareHolderDetails',
                                []
                            )}
                        />
                    )}

                    {applicationSummary.application && (
                        <BankLoanInformationSummary
                            marginBottom={15}
                            item={_.get(
                                applicationSummary,
                                'application[0].bankDetailsEntity',
                                {}
                            )}
                        />
                    )}

                    {applicationSummary.documents && (
                        <UploadedDocumentsSummary
                            marginBottom={15}
                            item={applicationSummary.documents}
                            appID={_.get(
                                applicationSummary,
                                'application[0].applicationId',
                                {}
                            )}
                        />
                    )}

                    {applicationSummary.application && (
                        <TncAndConsentSummary
                            marginBottom={15}
                            item={_.get(
                                applicationSummary,
                                'application[0].applicationDate'
                            )}
                            appID={_.get(
                                applicationSummary,
                                'application[0].applicationId'
                            )}
                            appStatus={_.get(
                                applicationSummary,
                                'application[0].status'
                            )}
                        />
                    )}
                </>
            ) : (
                <MatxLoading />
            )}
        </div>
    )
}

export default AscendNanoApplicationSummary
