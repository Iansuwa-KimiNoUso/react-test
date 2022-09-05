import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MUIDataTable from 'mui-datatables'

const useStyles = makeStyles(({ pallete, ...theme }) => ({
    muiDataTableMain: {
        borderRadius: '8px 8px 0px 0px',
        '& div .MuiTable-root': {
            [theme.breakpoints.down('sm')]: {
                tableLayout: 'auto',
            },
        },
        '& h6.MuiTypography-root.MuiTypography-subtitle1': {
            display: 'none',
        },
        '& .MuiFormControl-root.MuiTextField-root': {
            marginTop: '5px',
        },
        '& > div:nth-child(3)': {
            minHeight: '550px',
            backgroundColor: '#FAFAFA',
            paddingBottom: '15px',
        },
        '& div.MuiToolbar-regular > div > div > svg': {
            display: 'none',
        },
        '& > div.MuiToolbar-gutters:first-child': {
            borderBottom: '1px solid #EDEBEB',
            '& > div > div': {
                flex: 'auto',
                '& > .MuiTextField-root': {
                    flex: 'auto',
                },
            },
        },
        '& .MuiToolbar-gutters': {
            '& .MuiIconButton-root': {
                color: '#008C44',
            },
            '& .MuiIconButton-root.Mui-disabled': {
                color: '#CCC',
            },
            '& .MuiSelect-icon': {
                color: '#008C44',
            },
            '& .MuiSelect-select.MuiSelect-select': {
                color: '#666',
            },
            '& .MuiTablePagination-caption': {
                color: '#666',
                fontSize: '16px',
            },
        },
        '& .MuiTableHead-root': {
            '& .MuiTableCell-head': {
                color: '#333',
                fontSize: '14px',
                fontWeight: '700',
                backgroundColor: '#FAFAFA',
                borderBottom: 'none',
            },
            '& .MuiCheckbox-colorPrimary.Mui-checked': {
                color: '#008C44',
            },
        },
        '& .MuiTableBody-root': {
            '& .MuiTableRow-root': {
                backgroundColor: '#FFF',
                // '& > td:first-child': {
                //     color: '#008C44',
                // },
            },
            '& .MuiTableCell-body': {
                color: '#333',
                fontSize: '16px',
                borderBottom: '1px solid #EDEBEB',
                '& > div:first-child': {
                    fontSize: '14px',
                    fontWeight: '700',
                },
            },
            '& .MuiCheckbox-colorPrimary.Mui-checked': {
                color: '#008C44',
            },
            '& .MuiTableRow-root.Mui-selected': {
                background: 'rgba(236, 248, 238, 0.65)',
            },
            '& .MuiTableRow-root.MuiTableRow-hover:hover': {
                background: 'rgba(236, 248, 238, 0.65)',
            },
            '& .MuiTableRow-root.Mui-selected:hover': {
                background: 'rgba(236, 248, 238, 0.95)',
            },
            '& .MuiTableCell-body.datatables-noprint': {
                height: '157px',
            },
        },
        '& .MuiTableFooter-root': {
            backgroundColor: '#FAFAFA',
            '& .MuiTableCell-root': {
                borderBottom: 'none',
            },
            '& .MuiTablePagination-selectRoot': {
                fontSize: '16px',
            },
        },
        '& .MuiInput-underline:after': {
            borderBottom: '1px solid #008C44',
        },
        '& .MuiInput-underline:before': {
            borderBottom: '1px solid #008C44',
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: '2px solid #008C44',
        },
    },
    rowClick: {
        '& .MuiTableBody-root': {
            '& .MuiTableRow-root': {
                '& > td:nth-child(2)': {
                    color: '#008C44',
                },
                '& > td:nth-child(2):hover': {
                    fontWeight: 700,
                    cursor: 'pointer',
                },
                '& > td.MuiTableCell-body.datatables-noprint:nth-child(2):hover':
                    {
                        cursor: 'default',
                    },
                '& .MuiTypography-root.MuiTypography-body1': {
                    color: '#333',
                },
            },
        },
    },
}))

const SCMuiDataTables = (props) => {
    const styles = useStyles()

    return props.rowClick ? (
        <MUIDataTable
            className={`${styles.muiDataTableMain} ${styles.rowClick}`}
            data={props.data}
            columns={props.columns}
            options={props.options}
        />
    ) : (
        <MUIDataTable
            className={`${styles.muiDataTableMain}`}
            data={props.data}
            columns={props.columns}
            options={props.options}
        />
    )
}

export default SCMuiDataTables
