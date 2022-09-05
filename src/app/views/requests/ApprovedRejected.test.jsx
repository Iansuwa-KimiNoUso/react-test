import React from 'react'
import { mount } from 'enzyme'
import { Store } from 'app/redux/Store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

import ApprovedRejected, { handleClickDownload } from './ApprovedRejected'

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
                        <ApprovedRejected />
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

    it('Should be able to handle download', () => {
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
const requestsApprovedRejected = []
const requestsDownload = []

function mockUseSelector() {
    useSelector.mockImplementation((callback) => {
        return callback({
            allRequests: {
                requestsApprovedRejected,
                isFetchingRequestsApprovedRejected: false,
                isFetchingRequestsStatusDetail: false,
                requestsDownload,
                isFetchingRequestsDownload: false,
            },
        })
    })
}
