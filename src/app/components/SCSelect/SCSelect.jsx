import React, { useState } from 'react'
import { useField } from 'formik'
import {
    FormControl,
    FormHelperText,
    Select,
    MenuItem,
    Chip,
    Checkbox,
    ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    mainForm: {
        '& .selectUnblock': {
            backgroundColor: '#FFF',
        },
        '& .selectBlock': {
            backgroundColor: '#FAFAFA',
        },
    },
    selectStyle: {
        display: 'flex',
        padding: 0,
        '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#008C44',
            },
        },
        '& .Mui-disabled': {
            backgroundColor: '#FAFAFA',
        },
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: '0px 8px 0px 0px',
    },
    menuItemMultiple: {
        padding: 0,
        paddingRight: 17,
        '&:hover': {
            backgroundColor: 'rgba(236, 248, 238, 0.65)',
        },
        '&.Mui-selected': {
            backgroundColor: 'rgba(236, 248, 238, 0.65)',
            color: '#008C44',
            fontWeight: 700,
            '&:hover': {
                backgroundColor: 'rgba(236, 248, 238, 0.65)',
            },
        },
        '& .MuiCheckbox-root': {
            padding: '16px 16px 16px 17px',
        },
        '& .MuiTypography-root': {
            fontSize: 16,
        },
        '& .MuiSvgIcon-root': {
            color: '#008C44',
        },
    },

    menuItem: {
        padding: '16px 24px',
        fontSize: 16,
        '&:hover': {
            backgroundColor: 'rgba(236, 248, 238, 0.65)',
        },
        '&.Mui-selected': {
            backgroundColor: 'rgba(236, 248, 238, 0.65)',
            color: '#008C44',
            fontWeight: 700,
            '&:hover': {
                backgroundColor: 'rgba(236, 248, 238, 0.65)',
            },
        },
    },
}))

const SCSelect = (props) => {
    const classes = useStyles()
    const [field, meta] = useField(props)
    const [open, setOpen] = useState(false)

    const textFieldProps = {
        style: {
            display: 'flex',
            padding: '0px 14px',
            minHeight: 48,
            alignItems: 'center',
        },
    }

    const handleChangeValue = (event) => {
        if (typeof props.onChange !== 'undefined') {
            props.onChange(event)
        }
    }

    const handleBlurValue = (event) => {
        if (typeof props.onBlur !== 'undefined') {
            props.onBlur(event)
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const renderItems = () => {
        if (props.items.length > 0) {
            return props.items.map((item) => {
                if (props.multiple) {
                    return (
                        <MenuItem
                            key={item[props.valueKey]}
                            value={item[props.valueKey]}
                            className={classes.menuItemMultiple}
                        >
                            <Checkbox
                                checked={
                                    field.value.indexOf(item[props.valueKey]) >
                                    -1
                                }
                            />
                            <ListItemText primary={item[props.textKey]} />
                        </MenuItem>
                    )
                } else {
                    return (
                        <MenuItem
                            key={item[props.valueKey]}
                            value={item[props.valueKey]}
                            className={classes.menuItem}
                        >
                            {item[props.textKey]}
                        </MenuItem>
                    )
                }
            })
        } else {
            return (
                <MenuItem value="none" disabled>
                    {props.placeholder}
                </MenuItem>
            )
        }
    }

    return (
        <FormControl
            id={props.id}
            fullWidth
            className={classes.mainForm}
            error={meta.touched && meta.error ? true : false}
        >
            {props.multiple ? (
                <Select
                    {...field}
                    disabled={props.disabled}
                    id={props.id}
                    className={clsx(classes.selectStyle, props.className)}
                    SelectDisplayProps={textFieldProps}
                    variant="outlined"
                    fullWidth
                    multiple
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    className={classes.chip}
                                />
                            ))}
                        </div>
                    )}
                    onChange={handleChangeValue}
                >
                    {renderItems()}
                </Select>
            ) : (
                <Select
                    {...field}
                    id={props.id}
                    disabled={props.disabled}
                    className={clsx(classes.selectStyle, props.className)}
                    SelectDisplayProps={textFieldProps}
                    variant="outlined"
                    fullWidth
                    onChange={handleChangeValue}
                    onBlur={handleBlurValue}
                >
                    {renderItems()}
                </Select>
            )}
            {meta.touched && meta.error ? (
                <FormHelperText style={{ marginRight: 14, marginLeft: 14 }}>
                    {meta.error}
                </FormHelperText>
            ) : (
                ''
            )}
        </FormControl>
    )
}

export default SCSelect
