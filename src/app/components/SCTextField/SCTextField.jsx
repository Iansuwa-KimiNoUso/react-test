import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useField } from 'formik'

import { TextField } from '@material-ui/core'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    companyForm: {
        paddingRight: 77,
        marginTop: 40,
    },
    inputLabel: {
        color: '#666666',
        fontSize: 13,
        marginBottom: 4,
        textIndent: 8,
        '& required': {
            fontWeight: 700,
        },
    },
    textFieldStyles: {
        '& .Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#008C44',
            },
        },
        '& .Mui-disabled': {
            backgroundColor: '#fafafa',
        },
    },
    dateInput: {
        margin: 0,
    },
}))

const textFieldProps = {
    style: {
        display: 'flex',
        padding: '0px 14px',
        minHeight: 48,
        alignItems: 'center',
    },
}

const SCTextField = ({ ...props }) => {
    const classes = useStyles()
    const [focused, setFocused] = useState(false)
    const [field, meta] = useField(props)

    const handleInputValue = (event) => {
        if (typeof props.onInput !== 'undefined') {
            props.onInput(event)
        }
    }

    const handleInputBlur = (event) => {
        if (typeof props.onBlur !== 'undefined') {
            props.onBlur(event)
        }
    }

    const handleFocus = (event) => {
        setFocused(!focused)
    }

    return (
        <>
            <TextField
                id={props.id}
                className={classes.textFieldStyles}
                variant="outlined"
                fullWidth
                inputProps={{
                    ...textFieldProps,
                    maxLength: props.maxLength,
                }}
                {...field}
                disabled={props.disabled}
                type={props.type}
                onInput={handleInputValue}
                onBlur={handleInputBlur}
                onFocus={handleFocus}
                error={meta.touched && meta.error ? true : false}
                helperText={meta.touched && meta.error ? meta.error : ''}
            />
        </>
    )
}

export default SCTextField
