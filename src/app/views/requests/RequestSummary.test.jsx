import React from 'react'
import { mount } from 'enzyme'
import { Store } from 'app/redux/Store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

import RequestSummary, {
    handleClickApprove,
    handleApproveClose,
    handleAcceptApprove,
    handleClickReject,
    handleRejectClose,
    handleAcceptReject,
} from './RequestSummary'

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}))
const pendingReviewDetail = [
    {
        requestDate: '10/10/2022',
        requestId: 'testId',
        status: 'pending',
        statusDate: '10/10/2022',
        totalAmount: 100,
        advPaymentAmount: 100,
        financingFees: 100,
        totalFundingRequest: 100,
        remainingBalance: 100,
        transactionDetails: [
            {
                transactionId: 'testId',
                maturityDate: '10/10/2022',
                currency: 'usd',
                amount: 10,
            },
        ],
    },
]

describe('SuccessRequest Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        mockUseSelector()

        wrapper = mount(
            <Provider store={Store}>
                <BrowserRouter>
                    <RequestSummary location={{ state: 'test' }} />
                </BrowserRouter>
            </Provider>
        )
    })

    it('Transactions should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })

    it('Should handle approve', () => {
        const setOpenApproveDialog = jest.fn()
        handleClickApprove({ preventDefault: jest.fn() }, setOpenApproveDialog)

        expect(setOpenApproveDialog).toBeCalledWith(true)

        handleApproveClose({}, setOpenApproveDialog)

        expect(setOpenApproveDialog).toBeCalledWith(false)
    })

    it('Should handle accept aprrove', () => {
        const postRequestStatusDetail = jest.fn()
        const Dispatch = jest.fn()
        handleAcceptApprove(
            {},
            'appID',
            pendingReviewDetail,
            postRequestStatusDetail,
            Dispatch
        )

        expect(postRequestStatusDetail).toBeCalled()
    })

    it('Should handle reject', () => {
        const setOpenRejectDialog = jest.fn()
        handleClickReject({ preventDefault: jest.fn() }, setOpenRejectDialog)

        expect(setOpenRejectDialog).toBeCalledWith(true)

        const setRejectReason = jest.fn()
        handleRejectClose({}, setOpenRejectDialog, setRejectReason)

        expect(setOpenRejectDialog).toBeCalledWith(false)
    })

    it('Should handle accept reject', () => {
        const Dispatch = jest.fn()
        const postRequestStatusDetail = jest.fn()
        const setRejectReason = jest.fn()
        handleAcceptReject(
            {},
            'appID',
            pendingReviewDetail,
            'reject reasone',
            Dispatch,
            postRequestStatusDetail,
            setRejectReason
        )

        expect(postRequestStatusDetail).toBeCalled()
    })
})

function mockUseSelector() {
    useSelector.mockImplementation((callback) => {
        return callback({
            financing: {
                financing: [
                    {
                        status: 'Approved',
                    },
                ],
            },
            supplier: {
                supplierDetails: {
                    taxID: 'taxID',
                    vendorCode: 'vendorCode',
                    vendorSite: ['1234'],
                },
            },
            allRequests: {
                viewRequests: [],
                pendingReviewDetail,
                isFetchingRequestsStatusDetail: false,
            },
        })
    })
}
