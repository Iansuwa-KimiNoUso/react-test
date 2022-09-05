import React from 'react'
import useTranslation from 'app/hooks/translations'
import { SCPaper, SCColumnedInfo } from 'app/components'
import { account_types, loan_purposes } from 'app/config/constants'

const BankLoanInformationSummary = (props) => {
    const { REACT_APP_LANGUAGE: lang } = process.env
    const translation = useTranslation()
    const { bankDetailsForm } = translation.pages.supplyChainFinanceRegister
    const accountTypeObj =
        props.item.accountType === 1 ? account_types[0] : account_types[1]
    const loanPurposeObj =
        props.item.loanPurpose === 1 ? loan_purposes[0] : loan_purposes[1]
    const accountType =
        lang === 'th' ? accountTypeObj.nameTh : accountTypeObj.nameEn
    const loanPurpose =
        lang === 'th' ? loanPurposeObj.nameTh : loanPurposeObj.nameEn

    return (
        <SCPaper
            id="SCBankLoanInformationSummary"
            marginBottom={props.marginBottom}
            title={bankDetailsForm.bankInformation}
        >
            <SCColumnedInfo
                id="SCBankLoanInformationSummary_ColumnedInfo"
                items={[
                    {
                        key: bankDetailsForm.accountTypes,
                        value: accountType,
                    },
                    {
                        key: bankDetailsForm.accountHolderName,
                        value: props.item.accountHolderName,
                    },
                    {
                        key: bankDetailsForm.accountNumber,
                        value: props.item.accountNumber,
                    },
                    {
                        key: bankDetailsForm.bankName,
                        value: props.item.bankName,
                    },
                    {
                        key: bankDetailsForm.provinces,
                        value: props.item.province,
                    },
                    {
                        key: bankDetailsForm.branchName,
                        value: props.item.branchName,
                    },
                    {
                        key: bankDetailsForm.buyerCompanyName,
                        value: props.item.buyersCompanyName,
                    },
                    {
                        key: bankDetailsForm.loanPurposes,
                        value: loanPurpose,
                    },
                ]}
            />
        </SCPaper>
    )
}

export default BankLoanInformationSummary
