import React, { useState } from 'react'
import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    useMediaQuery,
} from '@material-ui/core'
import DropDownIcon from 'app/assets/images/icons/dropdown.svg'
import DropDownActiveIcon from 'app/assets/images/icons/dropdownActive.svg'
import { makeStyles } from '@material-ui/styles'
import Scrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { useTheme } from '@material-ui/core/styles'

import SCCard from '../SCCard/SCCard'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    heading: {
        color: '#333',
        fontSize: '40px',
        fontWeight: 700,
    },
    scrollContainer: {
        height: 460,
        '& .scrollbar-container': {
            marginRight: -10,
            '& .MuiAccordion-root': {
                marginBottom: 8,
                '& .MuiAccordionSummary-root': {
                    padding: '0px 0px ',

                    '& .MuiAccordionSummary-content': {
                        margin: 0,
                        '& p': {
                            fontSize: 16,
                        },
                    },
                    '& .MuiAccordionSummary-expandIcon': {
                        padding: 8,
                        marginRight: 12,
                    },
                },
                '& .MuiAccordionDetails-root': {
                    padding: '16px 22px 20px 16px',
                    backgroundColor: '#ECF8EEA6',
                    margin: '16px 22px 16px 0px',
                },
            },
        },
    },
}))

const SCAccordionSection = (props) => {
    const classes = useStyles()
    const [expanded, setExpanded] = useState(false)
    const theme = useTheme()
    const isMd = useMediaQuery(theme.breakpoints.down('md'))
    // const isSm = useMediaQuery(theme.breakpoints.down('sm'))
    const isXs = useMediaQuery(theme.breakpoints.down('xs'))

    const stringLength = () => {
        if (!isMd && !isXs) {
            return 184
        }
        if (isMd && !isXs) {
            return 150
        }
        if (isMd && isXs) {
            return 50
        }
    }
    const truncateString = (input) =>
        input.length > stringLength()
            ? `${input.substring(0, stringLength())}...`
            : input

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    const renderItems = (props) => {
        return props.items.map((item) => {
            return (
                <Accordion
                    id={props.id}
                    key={item[props.uniqueKey]}
                    expanded={expanded === `panel${item[props.uniqueKey]}`}
                    onChange={handleChange(`panel${item[props.uniqueKey]}`)}
                >
                    <AccordionSummary
                        expandIcon={
                            expanded === `panel${item[props.uniqueKey]}` ? (
                                <img
                                    src={DropDownActiveIcon}
                                    alt="DropDown Active Icon"
                                />
                            ) : (
                                <img src={DropDownIcon} alt="DropDown Icon" />
                            )
                        }
                        aria-controls={`panel${item[props.uniqueKey]}a-content`}
                        id={`panel${item[props.uniqueKey]}a-header`}
                    >
                        <Typography>
                            {expanded === `panel${item[props.uniqueKey]}`
                                ? item[props.summary]
                                : truncateString(item[props.summary])}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography
                            id={props.id}
                            dangerouslySetInnerHTML={{
                                __html: item[props.details],
                            }}
                        />
                    </AccordionDetails>
                </Accordion>
            )
        })
    }

    return (
        <SCCard icon={props.icon} title={props.title}>
            <Box className={classes.scrollContainer}>
                <Scrollbar options={{ suppressScrollX: true }}>
                    {renderItems(props)}
                </Scrollbar>
            </Box>
        </SCCard>
    )
}

export default SCAccordionSection
