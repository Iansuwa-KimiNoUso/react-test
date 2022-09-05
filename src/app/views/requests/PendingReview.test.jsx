import React from 'react'
import { mount } from 'enzyme'
import { Store } from 'app/redux/Store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

import PendingReview, {
    handleClickApprove,
    handleAcceptApprove,
    handleApproveClose,
    handleClickReject,
    handleRejectClose,
    handleAcceptReject,
    handleClickDownload,
} from './PendingReview'

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}))

describe('SuccessRequest Unit Tests', () => {
    let wrapper
    const theme = createTheme()

    beforeEach(() => {
        mockUseSelector()

        wrapper = mount(
            <Provider store={Store}>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <PendingReview />
                    </BrowserRouter>
                </ThemeProvider>
            </Provider>
        )
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('Transactions should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })

    it('Should handle click approve', () => {
        const translations = { select_transactions: 'select transactions' }
        const setShowMsg = jest.fn()
        const setErrorMsg = jest.fn()
        const setOpenApproveDialog = jest.fn()

        handleClickApprove(
            { preventDefault: jest.fn() },
            true,
            '',
            translations,
            setShowMsg,
            setErrorMsg,
            setOpenApproveDialog
        )
        expect(setShowMsg).toBeCalledWith(true)
        expect(setErrorMsg).toBeCalledWith(translations.select_transactions)

        handleClickApprove(
            { preventDefault: jest.fn() },
            false,
            'errorMessage',
            translations,
            setShowMsg,
            setErrorMsg,
            setOpenApproveDialog,
        )

        expect(setOpenApproveDialog).toBeCalledWith(true)
    })

    it('Should handle accept approve', () => {
        const Dispatch = jest.fn()
        const postRequestStatusDetail = jest.fn()

        jest.spyOn(window.localStorage.__proto__, 'getItem')
            .mockReturnValue('{"result":true, "count":42}');

        handleAcceptApprove({}, Dispatch, postRequestStatusDetail)
        expect(postRequestStatusDetail).toBeCalled()
    })

    it('Should handle approve close', () => {
        const setOpenApproveDialog = jest.fn()
        handleApproveClose({}, setOpenApproveDialog)

        expect(setOpenApproveDialog).toBeCalled()
    })

    it('Should handle click reject', () => {
        const translations = { select_transactions: 'select transactions' }
        const setShowMsg = jest.fn()
        const setErrorMsg = jest.fn()
        const setOpenRejectDialog = jest.fn()

        handleClickReject(
            { preventDefault: jest.fn() },
            true,
            '',
            translations,
            setShowMsg,
            setErrorMsg,
            setOpenRejectDialog
        )
        expect(setShowMsg).toBeCalledWith(true)
        expect(setErrorMsg).toBeCalledWith(translations.select_transactions)

        handleClickReject(
            { preventDefault: jest.fn() },
            false,
            'errorMessage',
            translations,
            setShowMsg,
            setErrorMsg,
            setOpenRejectDialog,
        )

        expect(setOpenRejectDialog).toBeCalledWith(true)
    })

    it('Should handle reject close', () => {
        const setOpenRejectDialog = jest.fn()
        const setRejectReason = jest.fn()

        handleRejectClose({}, setOpenRejectDialog, setRejectReason)
        expect(setOpenRejectDialog).toBeCalledWith(false)
    })

    it('Should handle accept reject', () => {
        jest.spyOn(window.localStorage.__proto__, 'setItem');
        const Dispatch = jest.fn()
        const postRequestStatusDetail = jest.fn()
        const setRejectReason = jest.fn()

        handleAcceptReject(
            {},
            'rejectReason',
            Dispatch,
            postRequestStatusDetail,
            setRejectReason
        )

        expect(postRequestStatusDetail).toBeCalled()
    })

    it('Should be able to reject', () => {
        const setShowMsg = jest.fn()
        const setErrorMsg = jest.fn()
        const Dispatch = jest.fn()
        const downloadRequests = jest.fn()
        const translations = { select_transactions: 'select translations' }

        handleClickDownload(
            { preventDefault: jest.fn() },
            true,
            '',
            setShowMsg,
            setErrorMsg,
            translations,
            Dispatch,
            downloadRequests,
        )

        expect(setErrorMsg).toBeCalledWith(translations.select_transactions)

        handleClickDownload(
            { preventDefault: jest.fn() },
            true,
            '',
            setShowMsg,
            setErrorMsg,
            translations,
            Dispatch,
            downloadRequests,
        )

        expect(setShowMsg).toBeCalled()

        jest.spyOn(window.localStorage.__proto__, 'getItem')
            .mockReturnValue('{"result":true, "count":42}');
        
        handleClickDownload(
            { preventDefault: jest.fn() },
            false,
            '',
            setShowMsg,
            setErrorMsg,
            translations,
            Dispatch,
            downloadRequests,
        )

        expect(Dispatch).toBeCalled()
    })
})
const requestsPendingReview = []
const requestsStatusDetail = []
const requestsDownload = []

function mockUseSelector() {
    useSelector.mockImplementation((callback) => {
        return callback({
            allRequests: {
                requestsPendingReview,
                isFetchingRequestsPendingReview: false,
                requestsStatusDetail,
                isFetchingRequestsStatusDetail: false,
                requestsDownload,
                isFetchingRequestsDownload: false,
            }
        })
    })
}
