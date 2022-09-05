import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import UploadIcon from 'app/assets/images/icons/upload.svg'
import UploadErrorIcon from 'app/assets/images/icons/uploadError.svg'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    contained: ({ props }) => ({
        backgroundColor: '#008C44',
        '& span': {
            color: '#FFFFFF',
        },
        '&:hover': {
            backgroundColor: 'rgb(1 120 59)',
        },
        fontSize: '16px',
        fontWeight: '500',
        height: props.height ? props.height : '48px',
        width: props.width ? props.width : 'auto',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.04)',
        borderRadius: '48px',
        padding: props.width ? '' : '0px 52px',
        margin: props.margin,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            margin: props.xsMargin,
            padding: 0,
        },
    }),
    outlined: ({ props }) => ({
        '& span': {
            color: props.requiredError ? '#E94933' : '#008C44',
        },
        fontSize: '16px',
        fontWeight: '500',
        height: props.height ? props.height : '48px',
        width: props.width ? props.width : 'auto',
        border: props.requiredError ? '1px solid #E94933' : '1px solid #008C44',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.04)',
        borderRadius: '48px',
        padding: props.width ? '' : '0px 52px',
        margin: props.margin,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            padding: 0,
        },
    }),
    textOnly: ({ props }) => ({
        backgroundColor: 'transparent',
        '& span': {
            color: '#008C44',
        },
        '&:hover': {
            backgroundColor: 'transparent',
        },
        fontSize: '16px',
        fontWeight: '500',
        margin: props.margin,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            padding: 0,
        },
    }),
    navLink: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
}))

const SCUploadButton = (props) => {
    let classes = useStyles({ props })

    const handleClick = (e, obj) => {
        /* istanbul ignore else */
        if (props.buttonClick) {
            props.buttonClick(e, obj)
        }
    }

    const buttonItem = (type) => {
        const definedClassName = props.outlined
            ? classes.outlined
            : classes.contained

        const definedIcon = props.requiredError ? UploadErrorIcon : UploadIcon

        return props.textOnly ? (
            <Button
                className={classes.textOnly}
                onClick={props.buttonClick ? handleClick : () => {}}
                style={props.style}
            >
                {props.text}
            </Button>
        ) : type === 'upload' ? (
            <>
                <input
                    accept="image/*"
                    className={classes.input}
                    id={props.id}
                    type="file"
                    multiple
                    onChange={(e) => props.onChange(e)}
                    style={{ display: 'none' }}
                />
                <label htmlFor={props.id}>
                    <Button
                        component="span"
                        className={definedClassName}
                        style={props.style}
                    >
                        {props.text}
                        <img
                            src={definedIcon}
                            alt=""
                            style={{ marginLeft: 10 }}
                        />
                    </Button>
                </label>
            </>
        ) : (
            <Button
                type={type}
                className={definedClassName}
                onClick={handleClick}
                style={props.style}
            >
                {props.text}
            </Button>
        )
    }

    const renderButton = () => {
        if (props.to) {
            return (
                <NavLink className={classes.navLink} to={props.to}>
                    {buttonItem('button')}
                </NavLink>
            )
        } else {
            return buttonItem(props.type)
        }
    }

    return renderButton()
}

export default SCUploadButton
