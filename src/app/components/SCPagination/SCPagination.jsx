import React from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    IconButton,
    TablePagination,
} from '@material-ui/core'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import LastPageIcon from '@material-ui/icons/LastPage'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import useTranslation from 'app/hooks/translations'

import _ from 'lodash'

export default function SCPagination(props) {

    const { pagination: translations } = useTranslation() 
    
    const TablePaginationActions = (_props) => {
        const { count, page, rowsPerPage, onPageChange } = _props

        const handleFirstPageButtonClick = (event) => {
            onPageChange(event, 0)
        }

        const handleBackButtonClick = (event) => {
            onPageChange(event, page - 1)
        }

        const handleNextButtonClick = (event) => {
            onPageChange(event, page + 1)
        }

        const handleLastPageButtonClick = (event) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
        }

        return (
            <Box sx={{ flexShrink: 0, ml: 2.5, color: '#008C44' }}>
                <IconButton
                    id="firstPageBtn"
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                    color="inherit"
                >
                    <FirstPageIcon />
                </IconButton>
                <IconButton
                    id="backBtn"
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                    color="inherit"
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton
                    id="nextBtn"
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                    color="inherit"
                >
                    <KeyboardArrowRightIcon />
                </IconButton>
                <IconButton
                    id="lastPageBtn"
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                    color="inherit"
                >
                    <LastPageIcon />
                </IconButton>
            </Box>
        )
    }

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    }

            
    const getLabelDisplayedRows = ({ from, to, count }) =>{
        return `${translations.showing} ${from}-${to} ${translations.of} ${count}`
    }

    return (
        <TablePagination
            id="notifPagination"
            component="div"
            style={_.get(props, 'style', {})}
            rowsPerPageOptions={_.get(props, 'rowsPerPageOptions', [])}
            count={_.get(props, 'count', [])}
            rowsPerPage={_.get(props, 'rowsPerPage', 10)}
            page={_.get(props, 'page', 1)}
            onPageChange={props.onPageChange}
            onRowsPerPageChange={props.onRowsPerPageChange}
            ActionsComponent={TablePaginationActions}
            labelDisplayedRows={getLabelDisplayedRows}
        />
    )
}
