import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Checkbox,
    IconButton,
    TablePagination,
    Typography,
    Button,
} from '@material-ui/core'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import LastPageIcon from '@material-ui/icons/LastPage'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { SCPageHeading } from '../../../app/components'
import useTranslation from '../../../app/hooks/translations'
import ReadMore from './ReadMore'
import { useMediaQuery } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

import {
    readSelectedNotifications,
    deleteNotification,
    readNotifications,
} from '../../redux/actions/NotificationActions'
import { useDispatch } from 'react-redux'
import useNotificationSyncHook from '../../hooks/useNotificationSync'
import useAuth from '../../hooks/useAuth'

const { REACT_APP_X_API_KEY } = process.env
const accessToken = window.sessionStorage.getItem('accessToken')
const headers = {
    Authorization: `Bearer ${accessToken}`,
    'X-Api-Key': REACT_APP_X_API_KEY,
}

const applyPagination = (notifs, page, limit) =>
    notifs.slice(page * limit, page * limit + limit)

const NoNotif = () => {
    const translation = useTranslation()
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'space-between',
                height: '78vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                }}
            >
                <SCPageHeading
                    title={translation.pages.notifications.heading}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexGrow: 1,
                }}
            >
                <Typography variant="body1">
                    {translation.pages.notifications.NoNotif}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="body2" color="secondary">
                    {translation.pages.notifications.ReadNotif}
                </Typography>
            </Box>
        </Box>
    )
}

//Sorting
const descendingComparator = (a, b, orderBy) => {
    const aDate = new Date(a[orderBy]).getTime()
    const bDate = new Date(b[orderBy]).getTime()
    if (bDate < aDate) {
        return -1
    }

    if (bDate > aDate) {
        return 1
    }

    return 0
}

const getComparator = (order, orderBy) =>
    order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)

const applySort = (notifs, sort) => {
    let [orderBy, order] = sort.split('|')
    const comparator = getComparator(order, orderBy)
    const stabilizedThis = notifs.map((el, index) => [el, index])

    stabilizedThis.sort((a, b) => {
        const newOrder = comparator(a[0], b[0])

        if (newOrder !== 0) {
            return newOrder
        }
        return a[1] - b[1]
    })

    return stabilizedThis.map((el) => el[0])
}

const NotificationsTable = (props) => {
    const BpIcon = styled('span')(({ theme }) => ({
        borderRadius: 3,
        width: 16,
        height: 16,
        margin: 4,
        border: '2px solid #CCCCCC',
        'input:disabled ~ &': {
            background: '#CCCCCC',
        },
    }))

    // Inspired by blueprintjs
    function BpCheckbox(props) {
        return <Checkbox color="primary" icon={<BpIcon />} {...props} />
    }

    const { businessProfileId } =
        useAuth().authData['https://api.abc.com/user_info']

    let busProfileId = businessProfileId
    if (busProfileId === undefined || busProfileId === null) {
        busProfileId = sessionStorage.getItem('busProfileId')
    }

    const { notifs } = props
    const { setKey } = useNotificationSyncHook()
    const translation = useTranslation()
    const [selectedCustomers, setSelectedCustomers] = useState([])
    const [sortDate] = useState('dateTime|desc')
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    let notifsArray = []
    notifs.filter((notif) => {
        if (notif.isActive) {
            notifsArray.push(notif)
        }
    })
    const dispatch = useDispatch()
    const maxValue = Math.max(0, Math.ceil(notifsArray.length / limit) - 1)
    if (
        maxValue * limit + limit === notifsArray.length &&
        page === maxValue + 1
    ) {
        setPage(page - 1)
    }

    const handleSelectOneNotif = (event, notifId) => {
        if (!selectedCustomers.includes(notifId)) {
            setSelectedCustomers((prevSelected) => [...prevSelected, notifId])
        } else {
            setSelectedCustomers((prevSelected) =>
                prevSelected.filter((id) => id !== notifId)
            )
        }
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleReadSelected = () => {
        dispatch(
            readSelectedNotifications(busProfileId, selectedCustomers, headers)
        )
        setSelectedCustomers([])
        setKey(Math.floor(Math.random() * 500000))
    }

    const handleDelete = (id) => {
        dispatch(deleteNotification(busProfileId, id, headers))
    }

    const TablePaginationActions = (props) => {
        const { count, page, rowsPerPage, onPageChange } = props

        const handleFirstPageButtonClick = (event) => {
            onPageChange(event, 0)
            setSelectedCustomers([])
        }

        const handleBackButtonClick = (event) => {
            onPageChange(event, page - 1)
            setSelectedCustomers([])
        }

        const handleNextButtonClick = (event) => {
            onPageChange(event, page + 1)
            setSelectedCustomers([])
        }

        const handleLastPageButtonClick = (event) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
            setSelectedCustomers([])
        }

        return (
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                <IconButton
                    id="firstPageBtn"
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                    color="primary"
                >
                    <FirstPageIcon />
                </IconButton>
                <IconButton
                    id="notifBackBtn"
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                    color="primary"
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <IconButton
                    id="notifNextIcon"
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                    color="primary"
                >
                    <KeyboardArrowRightIcon />
                </IconButton>
                <IconButton
                    id="lastPageBtn"
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                    color="primary"
                >
                    <LastPageIcon />
                </IconButton>
            </Box>
        )
    }

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    }

    const sortedByDate = applySort(notifsArray, sortDate)
    //revert date and time
    const paginatedNotifs = applyPagination(sortedByDate, page, limit)
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('xs'))

    return notifsArray.length !== 0 ? (
        <Box>
            <Box
                id="notifMainBox"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    mb: 3,
                }}
            >
                <SCPageHeading
                    id="notifPageHeading"
                    title={translation.pages.notifications.heading}
                />
                <Box
                    id="notifBox1"
                    sx={{
                        pt: 1,
                        display: 'flex',
                        justifyContent: isSmallScreen ? 'center' : 'flex-start',
                    }}
                >
                    <Button
                        id="notifReadSelectBtn"
                        variant="contained"
                        color="primary"
                        style={{
                            borderRadius: '48px',
                            width: '193px',
                            height: '40px',
                        }}
                        onClick={() => handleReadSelected()}
                    >
                        {translation.pages.notifications.MarkAsRead}
                    </Button>
                </Box>
            </Box>
            {paginatedNotifs.map((notif) => {
                const isCustomerSelected = selectedCustomers.includes(
                    notif.notifId
                )
                if (notif.isActive === true) {
                    const year = notif.dateTime.slice(0, 4)
                    const month = notif.dateTime.slice(5, 7)
                    const day = notif.dateTime.slice(8, 10)
                    const hour = Number(notif.dateTime.slice(11, 13)) + 7
                    const minute = notif.dateTime.slice(14, 16)
                    const formattedDate = `${hour}:${minute} ${day}/${month}/${year}`
                    return (
                        <Box
                            id="notifBox2"
                            key={notif.notifId}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                mb: 3,
                            }}
                        >
                            <Box
                                id="notifBox3"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    mr: 2,
                                }}
                            >
                                <Box id="notifBox4">
                                    <BpCheckbox
                                        id="notifCheckbox"
                                        checked={isCustomerSelected}
                                        onChange={(event) =>
                                            handleSelectOneNotif(
                                                event,
                                                notif.notifId
                                            )
                                        }
                                        value={isCustomerSelected}
                                        disabled={notif.isRead ? true : false}
                                    />
                                </Box>
                            </Box>
                            <Box
                                id="notifBox5"
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    p: 3,
                                    bgcolor: notif.isRead
                                        ? '#FFFFFF'
                                        : 'background.main',
                                }}
                                onClick={() => {
                                    dispatch(
                                        readNotifications(
                                            busProfileId,
                                            notif.notifId,
                                            headers
                                        )
                                    )
                                    setSelectedCustomers([])
                                    setKey(Math.floor(Math.random() * 500000))
                                }}
                            >
                                <Box id="notifBox6">
                                    <ReadMore
                                        headerLimit={100}
                                        messageLimit={275}
                                        isRead={notif.isRead}
                                        headerNotif={notif.title}
                                        dateTime={formattedDate}
                                        messageNotif={notif.description}
                                        handleDelete={handleDelete}
                                        id={notif.notifId}
                                    />
                                </Box>
                                <Box
                                    id="notifBox7"
                                    sx={{
                                        minWidth: '15%',
                                        display: {
                                            xs: 'none',
                                            sm: 'none',
                                            md: 'block',
                                            lg: 'block',
                                            xl: 'block',
                                        },
                                        justifyContent: 'flex-end',
                                        ml: 2,
                                    }}
                                >
                                    <Typography
                                        id="notifFormattedDate"
                                        variant="body2"
                                        color="secondary"
                                    >
                                        <b>{formattedDate}</b>
                                    </Typography>
                                    {notif.isRead && (
                                        <Box
                                            id="notifBox8"
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                mr: 3,
                                            }}
                                        >
                                            <Typography
                                                id="notifDelete"
                                                color="primary"
                                                style={{
                                                    cursor: 'pointer',
                                                    fontSize: 14,
                                                }}
                                                onClick={() =>
                                                    handleDelete(notif.notifId)
                                                }
                                            >
                                                <u>
                                                    {
                                                        translation.pages
                                                            .notifications
                                                            .Delete
                                                    }
                                                </u>
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    )
                } else {
                    return <Box></Box>
                }
            })}
            <Box
                id="notifBox9"
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                <Typography id="notifRead" variant="body2" color="secondary">
                    {translation.pages.notifications.ReadNotif}
                </Typography>
            </Box>
            <Box
                id="notifBox10"
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                <Typography
                    id="notifShowing"
                    style={{
                        fontSize: 14,
                    }}
                >
                    {translation.pages.notifications.Showing}
                </Typography>
                <TablePagination
                    id="notifPagination"
                    component="div"
                    rowsPerPageOptions={[]}
                    count={notifsArray.length}
                    rowsPerPage={limit}
                    page={page}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </Box>
        </Box>
    ) : (
        <NoNotif />
    )
}

NotificationsTable.propTypes = {
    notifs: PropTypes.array.isRequired,
}

export default NotificationsTable
