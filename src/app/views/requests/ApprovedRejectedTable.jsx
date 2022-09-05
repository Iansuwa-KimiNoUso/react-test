import React from 'react'
import { Paper, CircularProgress } from '@material-ui/core'
import _ from 'lodash'
import useTranslation from 'app/hooks/translations'
import history from 'history.js'
import { SCMuiDataTables } from 'app/components'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    noTxns: {
        '& .MuiCheckbox-root .MuiIconButton-label input[type="checkbox"]': {
            cursor: 'not-allowed',
            pointerEvents: 'all',
        },
        '& .MuiCheckbox-root .MuiIconButton-label svg': {
            color: '#ccc',
            background: '#ccc',
            width: '18px',
            height: '18px',
        },
    },
}))

export function handleCellClick(colData, colIndex, props) {
    if (_.isEmpty(props.transactions)) {
        return
    }

    if (colIndex.colIndex === 0) {
        history.push({
            pathname: '/request/approved-rejected-summary',
            state: {
                requestId: colData,
            },
        })
    }
}

export function customSearch(searchQuery, currentRow) {
    let filterRow = currentRow.filter((val, i) => {
        if (i !== 5) {
            return currentRow
        }
        return false
    })

    let isFound = false
    filterRow.forEach((col, i) => {
        if (_.toLower(col).toString().indexOf(_.toLower(searchQuery)) >= 0) {
            isFound = true
        }
    })
    return isFound
}

export function handleRowSelectionChage(rowsSelected, allRows, props) {
    /* istanbul ignore else */
    if (_.isEmpty(allRows)) {
        props.setShowMsg(true)
        props.setErrorMsg('')
        localStorage.setItem('selectedApproveRejectExport', JSON.stringify([]))
    }
}

export function handleToolbarSelect(selectedRows, displayData, props) {
    let result = displayData.filter((o1) =>
        selectedRows.data.some((o2) => o1.dataIndex === o2.dataIndex)
    )

    let getExportResultArray = result.map((o1) => ({
        requestId: o1.data[0],
    }))

    localStorage.setItem(
        'selectedApproveRejectExport',
        JSON.stringify(getExportResultArray)
    )

    props.setShowMsg(false)
    props.setErrorMsg('')
}

export default function ApprovedRejectedTable(props) {
    const classes = useStyles()
    const translation = useTranslation()

    const {
        request_approved_rejected: translations,
        pagination: paginationTranslations,
        table_filter,
    } = translation

    const columns = [
        {
            name: 'requestId',
            label: translations.req_id,
            options: {
                filter: true,
                sort: false,
                setCellProps: () => ({
                    style: {
                        fontWeight: 700,
                    },
                }),
            },
        },
        {
            name: 'vendorName',
            label: translations.supplier,
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'requestDate',
            label: translations.request_date,
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: 'totalFundingRequest',
            label: translations.total_funding_request,
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: 'remainingBalance',
            label: translations.remaining_balance,
            options: {
                filter: false,
                sort: false,
            },
        },
        {
            name: 'currency',
            label: translations.currency,
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: 'status',
            label: translations.status,
            options: {
                filter: true,
                sort: false,
            },
        },
    ]

    const options = {
        // selectableRows: 'none',
        search: true,
        viewColumns: false,
        download: false,
        print: false,
        filter: false,
        pagination: true,
        onCellClick: (colData, colIndex) =>
            handleCellClick(colData, colIndex, props),
        onRowSelectionChange: (rowsSelected, allRows) =>
            handleRowSelectionChage(rowsSelected, allRows, props),
        customToolbarSelect: (selectedRows, displayData) =>
            handleToolbarSelect(selectedRows, displayData, props),
        rowsPerPageOptions: [10, 20, 50],
        responsive: 'vertical',
        elevation: 0,
        searchPlaceholder: table_filter.searchData,
        customSearch: customSearch,
        textLabels: {
            body: {
                noMatch: _.isEmpty(props.transactions)
                    ? translations.no_requests_available
                    : translations.no_records_found,
            },
            pagination: {
                rowsPerPage: paginationTranslations.rowsPerPage,
                displayRows: paginationTranslations.of,
            },
            toolbar: {
                search: table_filter.search,
            },
        },
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
            {props.isFetching ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress style={{ color: '#008C44' }} />
                </div>
            ) : (
                <div
                    className={
                        _.isEmpty(props.transactions) ? classes.noTxns : ''
                    }
                >
                    <SCMuiDataTables
                        data={
                            _.isEmpty(props.transactions)
                                ? []
                                : props.transactions
                        }
                        columns={columns}
                        options={options}
                        rowClick="ViewRequests"
                    />
                </div>
            )}
        </Paper>
    )
}
