import React from 'react'
import { makeStyles } from '@material-ui/styles'
import useTranslation from 'app/hooks/translations'
import { SCPaper, SCColumnedInfo } from 'app/components'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    personalInfo: {
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
        color: '#333',
        fontSize: '40px',
        fontWeight: 700,
        marginBottom: 24,
    },
    inputLabel: {
        color: '#666666',
    },
}))

const PersonalDetailsSummary = (props) => {
    const classes = useStyles()
    const translation = useTranslation()
    const { personalDetailsForm } = translation.pages.supplyChainFinanceRegister

    // console.log('props personDetails', props)

    return (
        <SCPaper
            id="SCPersonalDetailsSummary"
            marginBottom={props.marginBottom}
            title={personalDetailsForm.formTitle}
            className={classes.personalInfo}
        >
            <SCPaper id="SCPersonalDetailsSummary_inner">
                {props.item.map((personDetails, index) => (
                    <SCColumnedInfo
                        id={`SCPersonalDetailsSummary_ColumnedInfo_${
                            index + 1
                        }`}
                        title={`${personalDetailsForm.formAccordionTitle} ${
                            index + 1
                        }`}
                        marginBottom={15}
                        key={index + 1}
                        className={classes.personalInfo}
                        items={[
                            {
                                key: personalDetailsForm.firstNameEN + ':',
                                value: personDetails.firstNameEn,
                            },
                            {
                                key: personalDetailsForm.lastNameEn + ':',
                                value: personDetails.lastNameEn,
                            },
                            {
                                key: '_' + index,
                                value: '',
                            },
                            {
                                key: personalDetailsForm.firstNameTH + ':',
                                value: personDetails.firstNameTh,
                            },
                            {
                                key: personalDetailsForm.lastNameTH + ':',
                                value: personDetails.lastNameTh,
                            },
                            {
                                key: '_' + index + 1,
                                value: '',
                            },
                            {
                                key: personalDetailsForm.nationality + ':',
                                value: personDetails.nationality,
                            },
                            {
                                key: personalDetailsForm.nationalIDcard + ':',
                                value: personDetails.nationalIdCardNo,
                            },
                            {
                                key: personalDetailsForm.laserCode + ':',
                                value: personDetails.laserCode,
                            },
                            {
                                key: personalDetailsForm.passportNumber + ':',
                                value: personDetails.passportNo,
                            },
                            {
                                key: personalDetailsForm.dateOfBirth + ':',
                                value: personDetails.dateOfBirth,
                            },
                            {
                                key: '_' + index + 2,
                                value: '',
                            },
                            {
                                key: personalDetailsForm.countryCode + ':',
                                value: personDetails.countryCode,
                            },
                            {
                                key: personalDetailsForm.mobileNumber + ':',
                                value: personDetails.mobileNumber,
                            },
                            {
                                key: personalDetailsForm.emailAddress + ':',
                                value: personDetails.emailAddress,
                            },
                            {
                                key: personalDetailsForm.jobTitle + ':',
                                value: personDetails.jobTitle,
                            },
                            {
                                key: personalDetailsForm.allocatedShares + ':',
                                value: personDetails.percentageOfAllocatedShares,
                            },
                        ]}
                    />
                ))}
            </SCPaper>
        </SCPaper>
    )
}

export default PersonalDetailsSummary
