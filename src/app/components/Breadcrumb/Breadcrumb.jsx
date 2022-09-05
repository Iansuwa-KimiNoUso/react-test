import React from 'react'
import { Icon, Breadcrumbs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    root: {
        color: '#ddd',
        '& .MuiBreadcrumbs-separator': {
            margin: 0,
        },
        '& MuiBreadcrumbs-li:last-child': {
            color: '#ddd',
        },
    },
    breadcrumbItem: {
        color: '#666666',
        fontSize: 12,
        textTransform: 'uppercase',
    },
    breadcrumbItemLast: {
        fontWeight: 700,
    },
    breadcrumbSeparator: {
        color: '#666666',
        fontSize: 12,
    },
}))

const Breadcrumb = ({ routeSegments }) => {
    const classes = useStyles()

    return (
        <div className="flex flex-wrap items-center">
            <Breadcrumbs
                separator={
                    <Icon className={classes.breadcrumbSeparator}>
                        navigate_next
                    </Icon>
                }
                className={`${classes.root} flex items-center relative`}
            >
                {routeSegments
                    ? routeSegments.map((route, index) => {
                          return index !== routeSegments.length - 1 ? (
                              <span
                                  key={index}
                                  className={classes.breadcrumbItem}
                              >
                                  {route.name}
                              </span>
                          ) : (
                              <span
                                  key={index}
                                  className={`${classes.breadcrumbItem} ${classes.breadcrumbItemLast}`}
                              >
                                  {route.name}
                              </span>
                          )
                      })
                    : null}
            </Breadcrumbs>
        </div>
    )
}

export default Breadcrumb
