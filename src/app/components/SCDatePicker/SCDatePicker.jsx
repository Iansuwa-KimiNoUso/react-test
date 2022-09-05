import thLocale from 'date-fns/locale/th'
import DateFnsUtils from '@date-io/date-fns'
import enLocale from 'date-fns/locale/en-US'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { IconButton } from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { useField } from 'formik'

import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import CalendarIcon from 'app/assets/images/icons/calendar.svg'

const localeMap = {
    en: enLocale,
    th: thLocale,
}

const useStyles = makeStyles(({ palette, ...theme }) => ({
    datePicker: {
        display: 'flex',
        padding: 0,
        '& .Mui-focused': {
            '& fieldset': {
                borderColor: '#008C44 !important',
            },
        },
        '& p': {
            fontFamily: 'inherit',
        },
        '& button': {
            cursor: 'pointer',
            pointerEvents: 'none',
        },
    },
}))

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
    },
    overrides: {
        MuiPickersDay: {
            day: {
                color: '#333333',
            },
            daySelected: {
                backgroundColor: '#008C44',
                color: '#ffffff',
                '&:hover': {
                    backgroundColor: '#008C44',
                },
            },
            current: {
                border: '1px solid #cccccc',
                color: '#333333',
            },
        },
        MuiPickersYear: {
            yearSelected: {
                color: '#008C44',
            },
        },
    },
})

function SCDatePicker(props) {
    const classes = useStyles()
    const [field, meta] = useField(props)

    const { REACT_APP_LANGUAGE: lang } = process.env

    const [locale, setLocale] = useState(lang)

    setLocale(lang)

    const textFieldProps = {
        style: {
            display: 'flex',
            padding: '0px 14px',
            minHeight: 48,
            alignItems: 'center',
            fontFamily: 'Anuyart',
            fontSize: 14,
        },
    }

    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                locale={localeMap[locale]}
            >
                <DatePicker
                    id={props.id}
                    className={classes.datePicker}
                    inputVariant="outlined"
                    variant="inline"
                    name={field.name}
                    value={field.value ? new Date(field.value) : field.value}
                    onChange={(date) => props.onChange(date)}
                    onBlur={(date) => props.onBlur(date)}
                    autoOk
                    format={'dd/MM/yyyy'}
                    disableFuture
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <img src={CalendarIcon} alt="" />
                            </IconButton>
                        ),
                    }}
                    inputProps={textFieldProps}
                    error={meta.error && meta.touched ? true : false}
                    helperText={meta.error && meta.touched ? meta.error : ''}
                />
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    )
}

export default SCDatePicker
