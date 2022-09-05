import React, { useState, useEffect } from 'react'
import {
    Grid,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
} from '@material-ui/core'
import { SCPaper } from 'app/components'
import { makeStyles } from '@material-ui/core/styles'
import useTranslation from 'app/hooks/translations'
import Divider from '@material-ui/core/Divider'
import PaperClipIcon from 'app/assets/images/icons/paperclip.svg'
import DownloadIcon from 'app/assets/images/icons/download.png'
import { downloadDocuments } from 'app/redux/actions/DowloadDocumentActions'
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    formPaper: {
        [theme.breakpoints.down('md')]: {
            paddingRight: 24,
        },
        '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E94933',
        },
        '&.MuiFormHelperText-root.Mui-error': {
            color: '#E94933',
        },
        '& .Mui-error': {
            color: '#E94933',
        },
        '& .MuiFormHelperText-root': {
            color: '#E94933',
        },
        '& .MuiGrid-container': {
            padding: '20px 0px',
            alignItems: 'center',
        },
    },
    optionalTitle: {
        fontWeight: 700,
        color: '#008C44',
        marginBottom: 15,
        fontSize: 24,
        margin: '30px 0px !important',
    },
    detailsValue: {
        marginLeft: 20,
    },
    outlined: ({ props }) => ({
        '& span': {
            color: '#008C44',
        },
        fontSize: '16px',
        fontWeight: '700',
        height: '40px',
        width: 'auto',
        border: '1px solid #008C44',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.04)',
        borderRadius: '48px',
        padding: '0px 30px',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            padding: 0,
        },
    }),
    downloadStyle: {
        '& .Mui-disabled': {
            color: '#008C44',
            cursor: 'progress',
            pointerEvents: 'all',
        },
        '& .Mui-disabled span': { color: '#008C44' },
        [theme.breakpoints.down('xs')]: {
            margin: 0,
            padding: '10px 0',
        },
    },
    colorgreen: {
        color: '#008C44',
        width: '24px !important',
        height: '24px !important',
        marginLeft: 10,
    },
    title: {
        fontWeight: 700,
        color: '#008C44',
        marginBottom: 15,
    },
    btnDownloadBoxCss: {
        display: 'flex',
        justifyContent: 'right',
        margin: '0 0 0 auto',
        width: '225px',
        [theme.breakpoints.down('sm')]: {
            width: '230px',
        },
        [theme.breakpoints.down('xs')]: {
            margin: '0 auto',
            width: '100%',
        },
    },
    paperClipText: {
        '& .MuiTypography-displayBlock': {
            fontSize: '16px',
        },
    },
}))

const UploadedDocumentsSummary = (props) => {
    const classes = useStyles()
    const translation = useTranslation()
    const dispatch = useDispatch()
    const [documents, setDocuments] = useState({})
    const { downloadDocsLoading } = useSelector(
        (state) => state.appDownloadDocs
    )

    const { uploadDocumentForm, notApplicable } =
        translation.pages.supplyChainFinanceRegister

    const setDocumentList = (docObject) => {
        setDocuments(docObject)
    }

    useEffect(() => {
        const docObj = {}
        if (props && props.item.length > 0) {
            props.item.forEach((doc) => {
                if (!docObj.hasOwnProperty(doc['group'])) {
                    docObj[doc['group']] = []
                }
                docObj[doc['group']].push(doc)
            })
        }
        setDocumentList(docObj)
    }, [props])

    const getDocumentList = (group) => {
        let uploadedDocs = []
        if (documents[group]) {
            uploadedDocs = documents[group].map((item) => {
                return (
                    <List
                        id="UDF_uploadedDocs"
                        className={classes.uploadedList}
                        key={item.documentId}
                        dense={true}
                    >
                        <ListItem>
                            <img
                                src={PaperClipIcon}
                                alt={item.documentName}
                                style={{ marginRight: 10 }}
                            />
                            <ListItemText
                                className={classes.paperClipText}
                                primary={item.documentName}
                            />
                        </ListItem>
                    </List>
                )
            })
        } else {
            return (
                <Typography
                    className={classes.detailsValue}
                    variant="subtitle1"
                >
                    {notApplicable}
                </Typography>
            )
        }
        return uploadedDocs
    }

    const handleClickDownload = (e, appID, code) => {
        e.preventDefault()

        dispatch(downloadDocuments(appID, code))
    }

    return (
        <>
            <SCPaper
                className={classes.formPaper}
                marginBottom={props.marginBottom}
            >
                <Grid container className="p-0">
                    <Grid item md={6} sm={6} xs={12}>
                        <Box
                            id="UploadDocumentSummaryTitleBoxItem"
                            display="flex"
                            justifyContent="left"
                            alignItems="left"
                        >
                            <Typography className={classes.title} variant="h5">
                                {uploadDocumentForm.title_upload}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <Box
                            id="UploadDocumentSummaryButtonBoxItem"
                            className={classes.btnDownloadBoxCss}
                        >
                            <Button
                                disabled={downloadDocsLoading}
                                id="DownloadAllBtn"
                                className={classes.outlined}
                                onClick={(e) =>
                                    handleClickDownload(e, props.appID, 'SCF')
                                }
                            >
                                {uploadDocumentForm.downloadAll}{' '}
                                {downloadDocsLoading ? (
                                    <CircularProgress
                                        className={classes.colorgreen}
                                    />
                                ) : (
                                    <img
                                        src={DownloadIcon}
                                        alt={uploadDocumentForm.downloadAll}
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

                <Grid container spacing={8} justifyContent="space-between">
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography style={{ fontSize: '16px' }}>
                            {uploadDocumentForm.id_authorised_title}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        id={`grid_authDirectorNationalId`}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{ textAlign: 'left' }}
                    >
                        {getDocumentList('authDirectorNationalId')}
                    </Grid>
                </Grid>
                <Divider style={{ margin: '5px 0px' }} variant="middle" />
                <Grid container spacing={8} justifyContent="space-between">
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography style={{ fontSize: '16px' }}>
                            {uploadDocumentForm.id_shareholder_title}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        id={`grid_shareholderNationalId`}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{ textAlign: 'left' }}
                    >
                        {getDocumentList('shareholderNationalId')}
                    </Grid>
                </Grid>
                <Divider style={{ margin: '5px 0px' }} variant="middle" />
                <Grid container spacing={8} justifyContent="space-between">
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography style={{ fontSize: '16px' }}>
                            {uploadDocumentForm.photo_authorised_title}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        id={`grid_livePhotoAuthDirector`}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{ textAlign: 'left' }}
                    >
                        {getDocumentList('livePhotoAuthDirector')}
                    </Grid>
                </Grid>
                <Divider style={{ margin: '5px 0px' }} variant="middle" />
                <Grid container spacing={8} justifyContent="space-between">
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography style={{ fontSize: '16px' }}>
                            {uploadDocumentForm.photo_business_property}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        id={`grid_livePhotoAuthDirector`}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{ textAlign: 'left' }}
                    >
                        {getDocumentList('businessProperty')}
                    </Grid>
                </Grid>
                <Divider style={{ margin: '5px 0px' }} variant="middle" />
                <Grid container spacing={8} justifyContent="space-between">
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography style={{ fontSize: '16px' }}>
                            {uploadDocumentForm.board_resolution_title}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        id={`grid_companyBoardResolution`}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{ textAlign: 'left' }}
                    >
                        {getDocumentList('companyBoardResolution')}
                    </Grid>
                </Grid>
                <Divider style={{ margin: '5px 0px' }} variant="middle" />
                <Grid container spacing={8} justifyContent="space-between">
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography style={{ fontSize: '16px' }}>
                            {uploadDocumentForm.affidavit_title}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        id={`grid_companyAffidavit`}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{ textAlign: 'left' }}
                    >
                        {getDocumentList('companyAffidavit')}
                    </Grid>
                </Grid>
                <Divider style={{ margin: '5px 0px' }} variant="middle" />
                <Grid container spacing={8} justifyContent="space-between">
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography style={{ fontSize: '16px' }}>
                            {uploadDocumentForm.registries}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        id={`grid_shareholderRegistries`}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{ textAlign: 'left' }}
                    >
                        {getDocumentList('shareholderRegistries')}
                    </Grid>
                </Grid>
                <Divider style={{ margin: '5px 0px' }} variant="middle" />
                <Grid container spacing={8} justifyContent="space-between">
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography style={{ fontSize: '16px' }}>
                            {uploadDocumentForm.pp30}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        id={`grid_PP30`}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{ textAlign: 'left' }}
                    >
                        {getDocumentList('PP30')}
                    </Grid>
                </Grid>
                <Divider style={{ margin: '5px 0px' }} variant="middle" />
                <Grid container spacing={8} justifyContent="space-between">
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography style={{ fontSize: '16px' }}>
                            {uploadDocumentForm.company_bank_book}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        id={`grid_companyBankStatement`}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{ textAlign: 'left' }}
                    >
                        {getDocumentList('companyBankStatement')}
                    </Grid>
                </Grid>
                <Divider style={{ margin: '5px 0px' }} variant="middle" />
                <Typography className={classes.optionalTitle}>
                    {uploadDocumentForm.optional}
                </Typography>
                <Divider style={{ margin: '5px 0px' }} variant="middle" />
                <Grid container spacing={8} justifyContent="space-between">
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography style={{ fontSize: '16px' }}>
                            {uploadDocumentForm.loa_title}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        id={`grid_letterOfAuthority`}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{ textAlign: 'left' }}
                    >
                        {getDocumentList('letterOfAuthority')}
                    </Grid>
                </Grid>
                <Divider style={{ margin: '5px 0px' }} variant="middle" />
                <Grid container spacing={8} justifyContent="space-between">
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography style={{ fontSize: '16px' }}>
                            {uploadDocumentForm.bank_statements}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        id={`grid_sixMonthsBankStatements`}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{ textAlign: 'left' }}
                    >
                        {getDocumentList('sixMonthsBankStatements')}
                    </Grid>
                </Grid>
                <Divider style={{ margin: '5px 0px' }} variant="middle" />
                <Grid container spacing={8} justifyContent="space-between">
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography style={{ fontSize: '16px' }}>
                            {uploadDocumentForm.ncb}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        id={`grid_directorsNCBReports`}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{ textAlign: 'left' }}
                    >
                        {getDocumentList('directorsNCBReports')}
                    </Grid>
                </Grid>
                <Divider style={{ margin: '5px 0px' }} variant="middle" />
                <Grid container spacing={8} justifyContent="space-between">
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography style={{ fontSize: '16px' }}>
                            {uploadDocumentForm.credit_report}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        id={`grid_companysCreditReport`}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{ textAlign: 'left' }}
                    >
                        {getDocumentList('companysCreditReport')}
                    </Grid>
                </Grid>
                <Divider style={{ margin: '5px 0px' }} variant="middle" />
                <Grid container spacing={8} justifyContent="space-between">
                    <Grid item md={9} sm={12} xs={12}>
                        <Typography
                            style={{ fontSize: '16px' }}
                            dangerouslySetInnerHTML={{
                                __html: uploadDocumentForm.others.replace(
                                    /(?:\r\n|\r|\n)/g,
                                    '<br />'
                                ),
                            }}
                        ></Typography>
                    </Grid>
                    <Grid
                        item
                        id={`grid_otherDocuments`}
                        md={3}
                        sm={12}
                        xs={12}
                        style={{ textAlign: 'left' }}
                    >
                        {getDocumentList('otherDocuments')}
                    </Grid>
                </Grid>
                <Divider style={{ margin: '5px 0px' }} variant="middle" />
            </SCPaper>
        </>
    )
}

export default UploadedDocumentsSummary
