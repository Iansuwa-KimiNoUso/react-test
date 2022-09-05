import React from 'react'
import { Typography, Box, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import useTranslation from 'app/hooks/translations'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    root: {
        boxShadow: 'none',
    },
    detailsContainer: {
        padding: '24px 24px 50px',
        borderRadius: 8,
    },
    detailsValue: {
        fontWeight: 700,
    },
    sectionTitle: {
        fontWeight: 700,
        color: '#008C44',
        marginBottom: 15,
    },
}))

const SCColumnedInfo = (props) => {
    const classes = useStyles()
    const translation = useTranslation()
    const notApplicable =
        translation.pages.supplyChainFinanceRegister.notApplicable

    const renderItems = () => {
        return props.items.map((item) => {
            return (
                <React.Fragment key={item.key}>
                    <Grid item xs={12} md={4}>
                        <Typography
                            className={classes.detailsTitle}
                            variant="subtitle1"
                        >
                            {item.key.charAt(0) === '_' ? '' : item.key}
                        </Typography>

                        {item.key.charAt(0) === '_' ? (
                            ''
                        ) : (
                            <Typography
                                className={classes.detailsValue}
                                variant="subtitle1"
                            >
                                {(item.key !== '' && item.value === '') ||
                                item.value === null ||
                                item.value === 0
                                    ? notApplicable
                                    : item.value}
                            </Typography>
                        )}
                    </Grid>
                </React.Fragment>
            )
        })
    }

    return (
        <Box sx={{ marginBottom: props.marginBottom }}>
            <Typography className={classes.sectionTitle} variant="h6">
                {props.title}
            </Typography>
            <Grid container spacing={3}>
                {renderItems()}
            </Grid>
        </Box>
    )
}

export default SCColumnedInfo
