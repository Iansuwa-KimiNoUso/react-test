import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
            color: props.color ? props.color : '#008C44',
        },
        fontSize: '16px',
        fontWeight: '500',
        height: props.height ? props.height : '48px',
        width: props.width ? props.width : 'auto',
        border: '1px solid #008C44',
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

const SCButton = (props) => {
    let classes = useStyles({ props })

    const handleClick = (e, obj) => {
        props.buttonClick(e, obj)
    }

    const buttonItem = (type) => {
        return props.textOnly ? (
            <Button
                disabled={props.disabled}
                id={props.id}
                className={classes.textOnly}
                onClick={props.buttonClick ? handleClick : () => {}}
                style={props.style}
            >
                {props.text}
            </Button>
        ) : (
            <Button
                disabled={props.disabled}
                id={props.id}
                type={type}
                className={
                    props.outlined ? classes.outlined : classes.contained
                }
                onClick={props.buttonClick ? handleClick : () => {}}
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

export default SCButton
