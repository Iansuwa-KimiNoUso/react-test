import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import ApplicationsTable from './applicationsTable'
import SCPagination from 'app/components/SCPagination/SCPagination'

import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { getApplications } from 'app/redux/actions/ApplicationAction'
import useTranslation from 'app/hooks/translations'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    heading: {
        color: '#333',
        fontSize: '40px',
        fontWeight: 700,
    },
    tableContainer: {
        minHeight: '539px',
        '& .MuiPaper-elevation1': {
            boxShadow: 'none',
            borderRadius: '8px',
        },
    },
}))

export default function Applications() {
    const classes = useStyles()
    const { applications, pagination, isFetching } = useSelector(
        (state) => state.applications
    )

    const { applications_page: translations } = useTranslation()
    const Dispatch = useDispatch()

    const handleChangePage = (event, newPage) => {
        Dispatch(
            getApplications({
                offset: newPage,
                pagesize: 10,
            })
        )
    }

    useEffect(() => {
        Dispatch(
            getApplications({
                offset: pagination.offset,
                pagesize: pagination.pageSize,
            })
        )

        // this will only run once the component loads
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id="ApplicationsPage" className="scf_infos m-sm-30">
            <Typography
                id="ApplicationsHeader"
                className={`${classes.heading}`}
            >
                {translations.applications}
            </Typography>
            <div className={classes.tableContainer}>
                <ApplicationsTable
                    applications={applications}
                    pagination={pagination}
                    isFetching={isFetching}
                />
            </div>
            <div>
                {!isFetching && !_.isEmpty(applications) && (
                    <SCPagination
                        id="applicationsPagination"
                        style={{ marginRight: '24px', color: '#666' }}
                        component="div"
                        count={_.get(pagination, 'totalRecords')}
                        rowsPerPageOptions={[10]}
                        rowsPerPage={10}
                        page={_.get(pagination, 'offset')}
                        onPageChange={handleChangePage}
                    />
                )}
            </div>
        </div>
    )
}
