import React from 'react'
import { mount } from 'enzyme'
import TimeRemaining from 'app/auth/TimeRemaining'
import { BrowserRouter } from 'react-router-dom'
import { act } from '@testing-library/react'

describe('TimeRemaining Unit Tests', () => {
    let wrapper
    let props = {
        logout: jest.fn(),
        timeLeft: 3,
        open: true
    }
    beforeAll(() => {
        wrapper = mount(
            <BrowserRouter>
                <TimeRemaining {...props}></TimeRemaining>
            </BrowserRouter>
        )
    })

    it('Should render', () => {
         expect(wrapper.length).toEqual(1)
    })

    it('Should handle handlers', () => {
        act(() => {
            wrapper.find('SCModal').props().handleCancel()
            wrapper.find('SCModal').props().handleOk()
        })

        expect(props.logout).toBeCalled()
    })
})
