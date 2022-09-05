import React, { useEffect } from 'react'
import useTranslation from 'app/hooks/translations'
import { SCPaper, SCColumnedInfo } from 'app/components'
import _ from 'lodash'
import {
    getTypeOfEntity,
    getIndustry,
    getBusinessType,
    getProvinces,
    getDistrict,
    getSubDistrict,
} from 'app/redux/actions/ReferrentialDataActions'
import { useDispatch, useSelector } from 'react-redux'

const { REACT_APP_LANGUAGE } = process.env

const CompanyDetailsSummary = (props) => {
    const translation = useTranslation()
    const dispatch = useDispatch()
    const { companyDetailsForm, notApplicable } =
        translation.pages.supplyChainFinanceRegister
    const {
        typeOfEntity,
        industry,
        businessType,
        provinces,
        districts,
        subDistricts,
    } = useSelector((state) => state.referrentialData)

    useEffect(() => {
        if (_.isEmpty(typeOfEntity)) {
            dispatch(getTypeOfEntity())
        }
    }, [typeOfEntity, dispatch])

    useEffect(() => {
        if (_.isEmpty(industry)) {
            dispatch(getIndustry())
        }
    }, [industry, dispatch])

    useEffect(() => {
        if (_.isEmpty(businessType)) {
            dispatch(getBusinessType())
        }
    }, [businessType, dispatch])

    useEffect(() => {
        if (_.isEmpty(provinces)) {
            dispatch(getProvinces())
        }
    }, [provinces, dispatch])

    useEffect(() => {
        if (_.isEmpty(districts)) {
            dispatch(getDistrict(props.item.province))
        }
    }, [districts, props.item.province, dispatch])

    useEffect(() => {
        if (_.isEmpty(subDistricts)) {
            dispatch(getSubDistrict(props.item.district))
        }
    }, [subDistricts, props.item.district, dispatch])

    let businessTypeInfo = ''
    let typeOfEntityInfo = ''
    let industryInfo = ''
    let provincesInfo = ''
    let districtsInfo = ''
    let subDistrictsInfo = ''

    const getbusinessTypeInfo = businessType.find(
        (val) => val.code === _.toNumber(props.item.businessType)
    )
    if (!_.isEmpty(getbusinessTypeInfo)) {
        businessTypeInfo =
            REACT_APP_LANGUAGE === 'en'
                ? getbusinessTypeInfo.name
                : getbusinessTypeInfo.nameTh
    }

    const getTypeOfEntityInfo = typeOfEntity.find(
        (val) => val.code === _.toNumber(props.item.typeOfEntity)
    )
    if (!_.isEmpty(getTypeOfEntityInfo)) {
        typeOfEntityInfo =
            REACT_APP_LANGUAGE === 'en'
                ? getTypeOfEntityInfo.name
                : getTypeOfEntityInfo.nameTh
    }

    const getIndustryInfo = industry.find(
        (val) => val.code === _.toNumber(props.item.industry)
    )
    if (!_.isEmpty(getIndustryInfo)) {
        industryInfo =
            REACT_APP_LANGUAGE === 'en'
                ? getIndustryInfo.name
                : getIndustryInfo.nameTh
    }

    const getProvincesInfo = provinces.find(
        (val) => val.code === _.toNumber(props.item.province)
    )
    if (!_.isEmpty(getProvincesInfo)) {
        provincesInfo =
            REACT_APP_LANGUAGE === 'en'
                ? getProvincesInfo.name
                : getProvincesInfo.nameTh
    }

    const getDistrictsInfo = districts.find(
        (val) => val.code === _.toNumber(props.item.district)
    )
    if (!_.isEmpty(getDistrictsInfo)) {
        districtsInfo =
            REACT_APP_LANGUAGE === 'en'
                ? getDistrictsInfo.name
                : getDistrictsInfo.nameTh
    }

    const getSubDistrictsInfo = subDistricts.find(
        (val) => val.code === _.toNumber(props.item.subdistrict)
    )
    if (!_.isEmpty(getSubDistrictsInfo)) {
        subDistrictsInfo =
            REACT_APP_LANGUAGE === 'en'
                ? getSubDistrictsInfo.name
                : getSubDistrictsInfo.nameTh
    }

    return (
        <SCPaper id="SCCompanyDetailsSummary" marginBottom={props.marginBottom}>
            <SCColumnedInfo
                id="SCCompanyDetailsSummary_ColumnedInfo"
                title={companyDetailsForm.formTitle}
                items={[
                    {
                        key: companyDetailsForm.companyNameEN + ':',
                        value: props.item.companyNameEn,
                    },
                    {
                        key: companyDetailsForm.companyNameTH + ':',
                        value: props.item.companyNameTh,
                    },
                    {
                        key: companyDetailsForm.taxID + ':',
                        value: props.item.companyRegistrationNo,
                    },
                    {
                        key: companyDetailsForm.vendorCode + ':',
                        value: props.item.vendorCode,
                    },
                    {
                        key: companyDetailsForm.vendorSiteNumber + ':',
                        value: _.join(props.item.vendorSite, ', '),
                    },
                    {
                        key: '',
                        value: '',
                    },
                    {
                        key: companyDetailsForm.companyWebsite + ':',
                        value: props.item.companyWebsite,
                    },
                    {
                        key: companyDetailsForm.typeOfEntity + ':',
                        value: typeOfEntityInfo
                            ? typeOfEntityInfo
                            : props.item.typeOfEntity,
                    },
                    {
                        key: companyDetailsForm.industry + ':',
                        value: industryInfo
                            ? industryInfo
                            : props.item.industry,
                    },
                    {
                        key: companyDetailsForm.businessType + ':',
                        value: businessTypeInfo
                            ? businessTypeInfo
                            : props.item.businessType,
                    },
                    {
                        key: companyDetailsForm.dateOfIncorporation + ':',
                        value: props.item.dateOfIncorporation,
                    },
                    {
                        key: companyDetailsForm.numberOfEmployees + ':',
                        value:
                            props.item.numberOfEmployees === '0'
                                ? notApplicable
                                : props.item.numberOfEmployees,
                    },
                    {
                        key: companyDetailsForm.country + ':',
                        value: props.item.country,
                    },
                    {
                        key: companyDetailsForm.registeredCompanyAddress + ':',
                        value: props.item.registeredCompanyAddress,
                    },
                    {
                        key: companyDetailsForm.provinces + ':',
                        value: provincesInfo
                            ? provincesInfo
                            : props.item.province,
                    },
                    {
                        key: companyDetailsForm.districts + ':',
                        value: districtsInfo
                            ? districtsInfo
                            : props.item.district,
                    },
                    {
                        key: companyDetailsForm.subdistricts + ':',
                        value: subDistrictsInfo
                            ? subDistrictsInfo
                            : props.item.subdistrict,
                    },
                    {
                        key: companyDetailsForm.postalCode + ':',
                        value: props.item.postalCode,
                    },
                ]}
            />
        </SCPaper>
    )
}

export default CompanyDetailsSummary
