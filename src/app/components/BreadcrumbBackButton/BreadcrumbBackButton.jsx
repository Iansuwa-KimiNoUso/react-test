import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Breadcrumb, BackButton } from 'app/components'
// import useTranslation from 'app/hooks/translations'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    breadcrumbContainer: {
        justifyContent: 'space-between',
    },
}))

const BreadcrumbBackButton = (props) => {
    const classes = useStyles()

    return (
        <div
            id={props.id}
            className={`mb-sm-30 flex ${classes.breadcrumbContainer}`}
        >
            <Breadcrumb routeSegments={props.routeSegments} />
            <BackButton customPath={props.customBackPath} />
        </div>
    )
}

export default BreadcrumbBackButton
