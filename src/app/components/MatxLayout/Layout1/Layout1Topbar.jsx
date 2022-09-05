import React from 'react'
import {
    IconButton,
    Badge,
    MenuItem,
    useMediaQuery,
    Hidden,
    Typography,
    // ListItemIcon,
    ListItemText,
} from '@material-ui/core'
import { MatxMenu } from 'app/components'
// import { Link, useLocation } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth'
import useSettings from 'app/hooks/useSettings'
import DropdownIcon from 'app/assets/images/icons/dropdown.svg'
import VerticalDivider from 'app/assets/images/icons/verticalDivider.svg'
import HamburgerIcon from 'app/assets/images/icons/hamburger.svg'
// import GreaterThanIcon from 'app/assets/images/icons/greaterThan.svg'
import useTranslation from 'app/hooks/translations'
import { useSelector } from 'react-redux'

const { REACT_APP_LANGUAGE } = process.env

const useStyles = makeStyles(({ palette, ...theme }) => ({
    topbar: {
        top: 0,
        zIndex: 96,
        transition: 'all 0.3s ease',
        background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))',

        '& .topbar-hold': {
            backgroundColor: palette.primary.main,
            height: 80,
            paddingLeft: 30,
            paddingRight: 30,
            [theme.breakpoints.down('sm')]: {
                paddingLeft: 16,
                paddingRight: 16,
            },
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 14,
                paddingRight: 16,
            },
        },
        '& .fixed': {
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.08)',
            height: 86,
            borderRadius: '0px 0px 8px 8px',
        },
    },
    dividerStyle: {
        margin: '0px 20px 0px 14px',
    },
    welcomeText: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            fontSize: 18,
        },
    },
    userName: {
        width: 171,
        lineHeight: '19px',
        [theme.breakpoints.down('sm')]: {
            width: 118,
        },
    },
    userMenu: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 24,
        padding: 4,
        '& span': {
            margin: '0 8px',
        },
    },
    mobileUsername: {
        display: 'flex',
        padding: '13px 27px',
    },
    menuItem: {
        padding: 0,
        borderBottom: '1px solid #EDEBEB',
        '& > a, & > span': {
            display: 'flex',
            alignItems: 'center',
            minWidth: 348,
            padding: '13px 27px',
        },
        '& div[class*="MuiListItemIcon"]': {
            minWidth: 0,
        },
        '&:hover': {
            backgroundColor: 'rgba(236, 248, 238, 0.65)',
            color: '#008C44',
            fontWeight: 700,
        },
    },
}))

let supplierDetailsLoaded = false

const Layout1Topbar = () => {
    const translation = useTranslation()
    // const location = useLocation()
    const theme = useTheme()
    const classes = useStyles()
    const { settings, updateSettings } = useSettings()
    const { logout } = useAuth()

    const { supplierDetails: user } = useSelector((state) => state.supplier)

    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))
    const fixed = settings?.layout1Settings?.topbar?.fixed

    if (!supplierDetailsLoaded) {
        supplierDetailsLoaded = true
    }

    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }

    const handleSidebarToggle = () => {
        let { layout1Settings } = settings
        let mode

        if (isMdScreen) {
            mode =
                layout1Settings.leftSidebar.mode === 'close'
                    ? 'mobile'
                    : 'close'
        } else {
            mode =
                layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full'
        }

        updateSidebarMode({ mode })
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div className={classes.topbar}>
            <div className={clsx({ 'topbar-hold': true, fixed: fixed })}>
                <div className="flex justify-between items-center h-full">
                    <div className="flex">
                        <Hidden lgUp>
                            <IconButton onClick={handleSidebarToggle}>
                                <img src={HamburgerIcon} alt="" />
                            </IconButton>
                        </Hidden>
                        <Typography
                            variant="h5"
                            className={classes.welcomeText}
                        >
                            {translation.header.welcome}
                        </Typography>
                    </div>
                    <div className="flex items-center">
                        {/* <NotificationBar /> */}
                        <Hidden xsDown>
                            <img
                                className={classes.dividerStyle}
                                src={VerticalDivider}
                                alt=""
                            />
                        </Hidden>
                        <Hidden xsDown>
                            <span className={classes.userName}>
                                <strong>
                                    {REACT_APP_LANGUAGE === 'en'
                                        ? user.companyNameEn
                                        : user.companyNameTh}
                                </strong>
                            </span>
                        </Hidden>
                        <MatxMenu
                            menuButton={
                                <div className={classes.userMenu}>
                                    <Badge color="secondary">
                                        <img src={DropdownIcon} alt="" />
                                    </Badge>
                                </div>
                            }
                        >
                            <Hidden smUp>
                                <span className={classes.mobileUsername}>
                                    <strong>
                                        {REACT_APP_LANGUAGE === 'en'
                                            ? user.companyNameEn
                                            : user.companyNameTh}
                                    </strong>
                                </span>
                            </Hidden>

                            {/* <MenuItem className={classes.menuItem}>
                                <Link to="#">
                                    <ListItemText
                                        primary={
                                            translation.header.dropdownMenu.help
                                        }
                                    />
                                    <ListItemIcon>
                                        <img src={GreaterThanIcon} alt="" />
                                    </ListItemIcon>
                                </Link>
                            </MenuItem>
                            <MenuItem className={classes.menuItem}>
                                <Link
                                    to={{
                                        pathname: '#',
                                        state: { from: location.pathname },
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            translation.header.dropdownMenu
                                                .termsAndConditions
                                        }
                                    />
                                    <ListItemIcon>
                                        <img src={GreaterThanIcon} alt="" />
                                    </ListItemIcon>
                                </Link>
                            </MenuItem>
                            <MenuItem className={classes.menuItem}>
                                <Link
                                    to={{
                                        pathname: '#',
                                        state: { from: location.pathname },
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            translation.header.dropdownMenu
                                                .privacyPolicy
                                        }
                                    />
                                    <ListItemIcon>
                                        <img src={GreaterThanIcon} alt="" />
                                    </ListItemIcon>
                                </Link>
                            </MenuItem> */}
                            <MenuItem
                                onClick={handleLogout}
                                className={classes.menuItem}
                            >
                                <span>
                                    <ListItemText
                                        primary={
                                            translation.header.dropdownMenu
                                                .logout
                                        }
                                    />
                                </span>
                            </MenuItem>
                        </MatxMenu>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Layout1Topbar)
