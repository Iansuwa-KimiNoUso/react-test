import * as React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import _ from 'lodash'
import useTranslation from 'app/hooks/translations'
import history from 'history.js'

const { REACT_APP_LANGUAGE: lang } = process.env

const useStyles = makeStyles(({ pallete, ...theme }) => ({
    firstItem: {
        padding: '0 0 0 16px',
        lineHeight: 1,
        fontWeight: 700,
        color: '#333D47',
    },
    lastItem: {
        paddingRight: '16px',
        lineHeight: 1,
        fontWeight: 700,
        color: '#333D47',
    },
    midItem: {
        lineHeight: 1,
        fontWeight: 700,
        color: '#333D47',
    },
    textBold: {
        fontSize: '16px',
        fontWeight: 700,
        color: '#616161',
    },
    table: {
        minWidth: 800,
        tableLayout: 'auto',
        [theme.breakpoints.down('md')]: {
            overflow: 'auto',
        },
        '& .MuiTableBody-root .MuiTableHead-root': {
            borderBottom: '1px solid #EDEBEB',
        },
        '& .MuiTableCell-root': {
            borderBottom: '1px solid #EDEBEB',
        },
    },
    tableHeader: {
        backgroundColor: '#FAFAFA',
        borderBottom: 'none',
        '& .MuiTableRow-head .MuiTableCell-root': {
            borderBottom: 'none',
        },
    },
    appId: {
        padding: '16px 8px 16px 16px',
        lineHeight: 1,
        color: '#008C44',
        fontWeight: 700,
    },
    totalContainer: {
        width: 'max-content',
        padding: '16px 16px 0',
        borderBottom: '1px solid #EDEBEB',
    },
    totalHeader: {
        color: '#008C44',
        fontSize: '20px',
        fontWeight: 700,
        width: 'max-content',
        padding: '16px 16px 0px',
        marginLeft: '16px',
        marginBottom: '-12px',
        borderBottom: '4px solid #008C44',
    },
    textSize: {
        fontSize: '16px',
        fontWeight: 400,
        color: '#333',
    },
}))

const TextButton = withStyles((theme) => ({
    root: {
        color: '#008C44',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: 'transparent',
            fontWeight: '700',
        },
        fontSize: '16px',
    },
}))(Button)

export function getCompanyName(application) {
    return _.includes(['th', 'TH', 'Th'], lang)
        ? application.companyNameTh
        : application.companyNameEn
}

export function getDateWithoutTime(date) {
    return _.first(_.split(date, ' '))
}

export default function CustomizedTables(props) {
    const styles = useStyles()
    //Todo: get this from translations
    const { applications_page: translations } = useTranslation()

    const headerConfig = {
        applicationID: {
            className: styles.firstItem,
            value: translations.app_id,
        },
        supplier: {
            value: translations.supplier,
        },
        product: {
            value: translations.product,
        },
        requestDate: {
            alignment: 'center',
            value: translations.request_date,
        },
        status: {
            className: styles.lastItem,
            alignment: 'center',
            value: translations.status,
        },
    }

    function getStatusTranslation(status) {
        return _.get(translations, _.snakeCase(status), status)
    }

    const handleClickAppID = (e, applicationID) => {
        e.preventDefault()
        history.push({
            pathname: 'application-summary',
            state: {
                appID: applicationID,
            },
        })
    }

    return (
        <Paper
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: 639,
                justifyContent: 'space-between',
            }}
        >
            <TableContainer component={Paper}>
                <Table
                    className={styles.table}
                    sx={{ minWidth: 800, minHeight: 539 }}
                    aria-label="table header"
                >
                    <TableHead>
                        <TableRow className={styles.totalContainer}>
                            <TableCell>
                                <Typography
                                    id="TotalApplications"
                                    className={`${styles.totalHeader}`}
                                >
                                    {_.get(props, 'pagination.totalRecords')}{' '}
                                    {translations.registration_applications}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableHead className={styles.tableHeader}>
                        <TableRow>
                            {_.map(headerConfig, (header) => (
                                <TableCell
                                    key={header.value}
                                    className={_.get(
                                        header,
                                        'className',
                                        styles.midItem
                                    )}
                                    align={_.get(header, 'alignment', 'left')}
                                >
                                    {header.value}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!props.isFetching &&
                            !_.isEmpty(props.applications) &&
                            _.map(props.applications, (application, index) => (
                                <TableRow key={index}>
                                    <TableCell
                                        className={styles.appId}
                                        component="th"
                                        scope="row"
                                        align="left"
                                    >
                                        <TextButton
                                            id="applicationID"
                                            onClick={(e) =>
                                                handleClickAppID(
                                                    e,
                                                    application.applicationId
                                                )
                                            }
                                        >
                                            {application.applicationId}
                                        </TextButton>
                                    </TableCell>
                                    <TableCell
                                        className={styles.textSize}
                                        component="th"
                                        scope="row"
                                        align="left"
                                    >
                                        {getCompanyName(application)}
                                    </TableCell>
                                    <TableCell
                                        className={styles.textSize}
                                        component="th"
                                        scope="row"
                                        align="left"
                                    >
                                        {application.productName}
                                    </TableCell>
                                    <TableCell
                                        className={styles.textSize}
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {getDateWithoutTime(
                                            application.applicationDate
                                        )}
                                    </TableCell>
                                    <TableCell
                                        className={styles.textSize}
                                        component="th"
                                        scope="row"
                                        align="center"
                                    >
                                        {getStatusTranslation(
                                            application.status
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {props.isFetching && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress style={{ color: '#008C44' }} />
                </div>
            )}
            {!props.isFetching && _.isEmpty(props.applications) && (
                <div style={{ textAlign: 'center' }}>
                    <Typography id="noDataPlaceHolder">
                        {translations.no_applications}
                    </Typography>
                </div>
            )}
            <div></div>
        </Paper>
    )
}
