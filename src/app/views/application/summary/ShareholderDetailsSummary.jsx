import React from 'react'
import { makeStyles } from '@material-ui/styles'
import useTranslation from 'app/hooks/translations'
import { SCPaper, SCColumnedInfo } from 'app/components'
import _ from 'lodash'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    shareHolderInfo: {
        '& .MuiPaper-rounded': {
            backgroundColor: ' #FAFAFA',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.02)',
            borderRadius: '8px',
            paddingBottom: '24px',
        },
        '& .MuiTypography-h6': {
            color: '#666666',
        },
    },
    heading: {
        color: '#666666',
        fontSize: '40px',
        fontWeight: 700,
        marginBottom: 24,
    },
}))

const ShareholderDetailsSummary = (props) => {
    const classes = useStyles()
    const translation = useTranslation()
    const notApplicable =
        translation.pages.supplyChainFinanceRegister.placeholder.not_applicable
    const { shareholderDetailsForm } =
        translation.pages.supplyChainFinanceRegister

    // console.log('props stakeholder', props)
    const shareHolderDetails = _.filter(props.item, (item) => {
        return !_.isEmpty(item.passportNo)
    })

    return (
        <SCPaper
            id="SCShareholderSummary"
            marginBottom={props.marginBottom}
            title={shareholderDetailsForm.formTitle}
            className={classes.shareHolderInfo}
        >
            <SCPaper id="SCShareholderSummary_inner">
                {!_.isEmpty(shareHolderDetails) ? (
                    shareHolderDetails.map((stakeholder, index) => (
                        <SCColumnedInfo
                            id={`SCShareholderSummary_ColumnedInfo_${index}`}
                            title={`${
                                shareholderDetailsForm.shareHoldercount
                            } ${index + 1}`}
                            marginBottom={props.marginBottom}
                            className={classes.shareHolderInfo}
                            key={index}
                            items={[
                                {
                                    key:
                                        shareholderDetailsForm.firstNameEN +
                                        ':',
                                    value: stakeholder.firstNameEn,
                                },
                                {
                                    key:
                                        shareholderDetailsForm.lastNameEN + ':',
                                    value: stakeholder.lastNameEn,
                                },
                                {
                                    key: '_' + index,
                                    value: '',
                                },
                                {
                                    key:
                                        shareholderDetailsForm.firstNameTH +
                                        ':',
                                    value: stakeholder.firstNameTh,
                                },
                                {
                                    key:
                                        shareholderDetailsForm.lastNameTH + ':',
                                    value: stakeholder.lastNameTh,
                                },
                                {
                                    key: '_' + index + 1,
                                    value: '',
                                },
                                {
                                    key:
                                        shareholderDetailsForm.nationality +
                                        ':',
                                    value: stakeholder.nationality,
                                },
                                {
                                    key:
                                        shareholderDetailsForm.nationalIDcard +
                                        ':',
                                    value: stakeholder.nationalIdCardNo,
                                },
                                {
                                    key: '_' + index + 2,
                                    value: '',
                                },
                                {
                                    key: shareholderDetailsForm.laserCode + ':',
                                    value: stakeholder.laserCode,
                                },
                                {
                                    key:
                                        shareholderDetailsForm.passportNumber +
                                        ':',
                                    value: stakeholder.passportNo,
                                },
                                {
                                    key:
                                        shareholderDetailsForm.allocatedShares +
                                        ':',
                                    value: stakeholder.percentageOfAllocatedShares,
                                },
                            ]}
                        />
                    ))
                ) : (
                    <div style={{ fontWeight: 600 }}>{notApplicable}</div>
                )}
            </SCPaper>
        </SCPaper>
    )
}

export default ShareholderDetailsSummary
