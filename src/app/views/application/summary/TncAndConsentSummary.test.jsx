import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { Store } from 'app/redux/Store'
import axios from 'axios.js'
import { act } from 'react-dom/test-utils'

import TncAndConsentSummary, { getTimeDateformat } from './TncAndConsentSummary'

describe('Functional Test', () => {
    it('should be able to get Date', () => {
        expect(getTimeDateformat('10/10/2020')).toEqual('10/10/2020')
    })
})

describe('Behavior and Render Test', () => {
    let wrapper
    let postAxiosSpy
    const theme = createTheme()

    const props = {
        appID: 'ff7e96a5-6874-4fdf-8cf3-af6f987a39f3',
        appStatus: 'Pending',
        item: '18/03/2022 15:05:53',
        marginBottom: 15,
    }

    beforeEach(() => {
        postAxiosSpy = jest.spyOn(axios, 'post').mockResolvedValue({
            data: { code: 200 },
        })

        wrapper = mount(
            <Provider store={Store}>
                <ThemeProvider theme={theme}>
                    <TncAndConsentSummary {...props} />
                </ThemeProvider>
            </Provider>
        )
    })

    afterEach(() => {
        jest.restoreAllMocks()
        postAxiosSpy.mockClear()
    })

    it('should render', () => {
        expect(wrapper.length).toEqual(1)
    })

    it('Should be able to approve and confirm', () => {
        act(() => {
            wrapper
                .find('#TNCApprove')
                .first()
                .props()
                .buttonClick({ preventDefault: jest.fn() })
        })

        wrapper.update()
        expect(wrapper.find('#ApproveModal').props().openDialog).toEqual(true)

        act(() => {
            wrapper.find('#ApproveModal').props().handleOk({})
        })
        waitForRequests(1)
        expect(postAxiosSpy).toBeCalled()
    })

    it('Should be able to approve and cancel', () => {
        act(() => {
            wrapper
                .find('#TNCApprove')
                .first()
                .props()
                .buttonClick({ preventDefault: jest.fn() })
        })

        wrapper.update()
        expect(wrapper.find('#ApproveModal').props().openDialog).toEqual(true)

        act(() => {
            wrapper.find('#ApproveModal').props().handleCancel({})
        })
        wrapper.update()
        expect(wrapper.find('#ApproveModal').props().openDialog).toEqual(false)
    })

    it('Should be able to reject and confirm', () => {
        act(() => {
            wrapper
                .find('#TNCReject')
                .first()
                .props()
                .buttonClick({ preventDefault: jest.fn() })
        })

        wrapper.update()
        expect(wrapper.find('#RejectModal').props().openDialog).toEqual(true)

        act(() => {
            wrapper.find('#RejectModal').props().handleOk({})
        })
        waitForRequests(1)
        expect(postAxiosSpy).toBeCalled()
    })

    it('Should be able to approve and cancel', () => {
        act(() => {
            wrapper
                .find('#TNCReject')
                .first()
                .props()
                .buttonClick({ preventDefault: jest.fn() })
        })

        wrapper.update()
        expect(wrapper.find('#RejectModal').props().openDialog).toEqual(true)

        act(() => {
            wrapper.find('#RejectModal').props().handleCancel({})
        })
        wrapper.update()
        expect(wrapper.find('#RejectModal').props().openDialog).toEqual(false)
    })
})

function waitForRequests(delay) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}
