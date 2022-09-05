import React from 'react'
import { Typography, TextareaAutosize } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
// import clsx from 'clsx'
import { SCButton } from 'app/components'
// import useSettings from 'app/hooks/useSettings'
// import useTranslation from 'app/hooks/translations'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    dialogStyle: {
        '& *': {
            color: '#333333',
        },
        '& div[class*="MuiDialogTitle"]': {
            padding: 0,
            paddingBottom: 6,
            marginBottom: 16,
            '& h4': {
                fontWeight: 700,
            },
        },
        '& div[class*="MuiDialogContent"]': {
            padding: 0,
            marginBottom: 30,
            '& p': {
                textAlign: 'center',
                fontSize: 16,
                color: '#666666 !important',
                fontWeight: 400,
                marginBottom: 0,
            },
        },
        '& div[class*="MuiDialogActions"]': {
            padding: 0,
            justifyContent: 'center',
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
            },
        },
        '& div[class*="MuiDialog-paper"]': {
            [theme.breakpoints.down('md')]: {
                minWidth: '550px !important',
            },
            [theme.breakpoints.down('xs')]: {
                minWidth: 'auto !important',
            },
        },
        '& .MuiButton-root.Mui-disabled': {
            color: '#fff',
            border: '1px solid #CCC',
            backgroundColor: '#CCC',
        },
    },
    textFieldStyles: {
        border: '1px solid #CCC',
        borderRadius: '8px',
        '& .Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#008C44',
            },
        },
        '& .Mui-disabled': {
            backgroundColor: '#fafafa',
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#008C44',
        },
    },
    textAreaStyles: {
        color: '#333',
        font: 'inherit',
        fontFamily: 'Anuyart',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '140%',
        display: 'flex',
        padding: '15px',
        minHeight: 98,
        minWidth: '100%',
        alignItems: 'center',
        resize: 'none',
        border: '1px solid #CCC',
        borderRadius: '8px',
        '&::-webkit-input-placeholder': {
            color: '#CCC',
            font: 'inherit',
            fontFamily: 'Anuyart',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '140%',
        },
        '&:-moz-placeholder': {
            color: '#CCC',
            font: 'inherit',
            fontFamily: 'Anuyart',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '140%',
        },
        '&::-moz-placeholder': {
            color: '#CCC',
            font: 'inherit',
            fontFamily: 'Anuyart',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '140%',
        },
        '&:-ms-input-placeholder': {
            color: '#CCC',
            font: 'inherit',
            fontFamily: 'Anuyart',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '140%',
        },
        '&::placeholder': {
            color: '#CCC',
            font: 'inherit',
            fontFamily: 'Anuyart',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '140%',
        },
        '&:focus': {
            borderColor: '#008C44',
        },
        '&:hover': {
            borderColor: '#008C44',
        },
        '&:focus-visible': {
            borderColor: '#008C44',
            outline: '2px solid #008C44',
        },
    },
}))

const SCModal = (props) => {
    const classes = useStyles()

    const handleCancel = (e, obj) => {
        props.handleCancel(e, obj)
    }
    const handleOk = () => {
        props.handleOk()
    }

    const renderCancelButton = () => {
        if (props.cancel) {
            return (
                <SCButton
                    id="SCModalCancelButton"
                    buttonClick={(e, obj) => handleCancel(e, obj)}
                    outlined
                    disabled={props.cancelDisabled}
                    text={props.cancel}
                    height=""
                    width={props.cancelWidth}
                />
            )
        }
    }

    const renderOkButton = () => {
        if (props.ok) {
            return (
                <SCButton
                    id="SCModalOkButton"
                    buttonClick={handleOk}
                    disabled={props.okDisabled}
                    contained
                    text={props.ok}
                    height=""
                    width={props.okWidth}
                    style={props.cancel ? { marginLeft: '20px' } : {}}
                    xsMargin={props.cancel ? '10px 0px 0px 0px !important' : ''}
                />
            )
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        props.setReason(e.target.value)
    }

    return (
        <Dialog
            className={classes.dialogStyle}
            open={props && props.openDialog ? props.openDialog : false}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                style: {
                    backgroundColor: '#FFFFFF',
                    color: '#333333',
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.25)',
                    minWidth: 655,
                    padding: '40px 60px',
                    borderRadius: 16,
                },
            }}
        >
            <DialogTitle disableTypography>
                <Typography
                    variant="h4"
                    style={{
                        fontSize: 30,
                        textAlign: 'center',
                    }}
                    dangerouslySetInnerHTML={{ __html: props.title }}
                />
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    dangerouslySetInnerHTML={{ __html: props.content }}
                />
                {props.placeholder && (
                    <TextareaAutosize
                        className={classes.textAreaStyles}
                        aria-label="Reasons"
                        placeholder={props.placeholder}
                        onChange={handleChange}
                        maxLength={
                            props.charMaxLimit ? props.charMaxLimit : 250
                        }
                    />
                )}
            </DialogContent>
            <DialogActions>
                {renderCancelButton()}
                {renderOkButton()}
            </DialogActions>
        </Dialog>
    )
}

export default SCModal
