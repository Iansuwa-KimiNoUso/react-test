import React, { useState } from 'react'
import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
} from '@material-ui/core'
import DropDownIcon from 'app/assets/images/icons/dropdown.svg'
import DropDownActiveIcon from 'app/assets/images/icons/dropdownActive.svg'
import { makeStyles } from '@material-ui/styles'
import 'react-perfect-scrollbar/dist/css/styles.css'
// import { useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    root: {
        '& .MuiAccordionDetails-root': {
            display: 'block',
        },
        '& .MuiAccordionSummary-content': {
            justifyContent: 'space-between',
            alignItems: 'center',
            '& p': {
                color: '#666666',
                fontSize: 20,
            },
        },
    },
    removeBtn: {
        fontWeight: 400,
        fontSize: 16,
        color: '#E94933',
        textDecoration: 'underline',
    },
}))

const SCAccordionForm = (props) => {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(
        props.expanded ? props.expanded : false
    )
    // const theme = useTheme()
    // const isMd = useMediaQuery(theme.breakpoints.down('md'))
    // const isSm = useMediaQuery(theme.breakpoints.down('sm'))
    // const isXs = useMediaQuery(theme.breakpoints.down('xs'))

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded)
    }

    const handleStopPropagation = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }
    const renderItems = () => {
        return (
            <Accordion
                className={classes.root}
                expanded={expanded}
                onChange={handleChange(`panel`)}
            >
                <AccordionSummary
                    expandIcon={
                        expanded ? (
                            <img
                                src={DropDownActiveIcon}
                                alt="DropDown Active Icon"
                            />
                        ) : (
                            <img src={DropDownIcon} alt="DropDown Icon" />
                        )
                    }
                    aria-controls={`panel-content`}
                    id={`panel-header`}
                >
                    <Typography>{props.title}</Typography>
                    {props.withRemove && (
                        <Button
                            color="primary"
                            onClick={(e) => {
                                props.handleRemove(e)
                                handleStopPropagation(e)
                            }}
                            className={classes.removeBtn}
                        >
                            {props.withRemoveText}
                        </Button>
                    )}
                </AccordionSummary>
                <AccordionDetails>{props.children}</AccordionDetails>
            </Accordion>
        )
    }

    return renderItems()
}

export default SCAccordionForm
