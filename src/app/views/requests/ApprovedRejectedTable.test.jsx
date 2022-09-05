import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import History from 'history.js'

import ApprovedRejectedTable, {
    customSearch,
    handleRowSelectionChage,
    handleToolbarSelect,
    handleCellClick
} from './ApprovedRejectedTable'

describe('SuccessRequest Unit Tests', () => {
    let wrapper
    const props = {
        isFetching: false,
        productId: 'testProductID',
    }

    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <ApprovedRejectedTable {...props} />
            </BrowserRouter>
        )
    })

    afterEach(() => {
        wrapper.unmount()
        jest.restoreAllMocks()
    })

    it('Transactions should render', () => {
        expect(wrapper.length).toEqual(1)
    })

    it('Should handle select cell', () => {
        const historySpy = jest.spyOn(History, 'push')
        handleCellClick('requestId', { colIndex: 0}, { transactions: [{}]})

        expect (historySpy).toBeCalled()

        handleCellClick('requestId', { colIndex: 0 }, { transactions: [] })
        // nothing is expected to happen when transactions is empty
    })

    it('Should handle custom search', () => {
        let isFound

        isFound = customSearch('test', [{}])
        expect(isFound).toBe(false)

        isFound = customSearch('test', ['', '', '', '', ''])
        expect(isFound).toBe(false)

        isFound = customSearch('test', ['test', '', '', '', ''])
        expect(isFound).toBe(true)
    })

    it('Should handle row selection', () => {
        jest.spyOn(window.localStorage.__proto__, 'setItem')
        window.localStorage.__proto__.setItem = jest.fn()
        const _props = {
            setShowMsg: jest.fn(),
            setErrorMsg: jest.fn()
        }

        handleRowSelectionChage([], [], _props)

        expect(localStorage.setItem).toBeCalled()
        expect(_props.setShowMsg).toBeCalled()
        expect(_props.setErrorMsg).toBeCalled()
    })

    it('Should be able to handle toolbar select', () => {
        jest.spyOn(window.localStorage.__proto__, 'setItem')
        window.localStorage.__proto__.setItem = jest.fn()

        const _props = {
            productId: 'testProductId',
            setShowMsg: jest.fn(),
            setErrorMsg: jest.fn(),
        }

        const selectedRows = {
            data: [{ dataIndex: 0 }],
        }
        const displayData = [
            {
                dataIndex: 0,
                data: [
                    'transactionId',
                    'customer',
                    '10/10/2022',
                    100,
                    'usd',
                    '10/10/2022',
                ],
            },
        ]
        const translations = {
            finance_product: {
                same_maturity_date: 'same_maturity_date',
                same_currency: 'same_currency',
            },
        }

        handleToolbarSelect(
            selectedRows,
            displayData,
            _props,
            'nameTh',
            translations
        )
    })
})
