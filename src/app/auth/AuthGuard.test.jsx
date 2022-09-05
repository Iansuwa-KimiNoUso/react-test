import React from 'react'
import { mount } from 'enzyme'
import AuthGuard from 'app/auth/AuthGuard'
import { BrowserRouter } from 'react-router-dom'
import * as authHook from '../hooks/useAuth'
// import { checkSecond, hmsToSecondsOnly } from 'app/auth/AuthGuard'

// describe('AuthGuard functional Test', () => {
//     expect(checkSecond('9')).toEqual('09')
//     expect(checkSecond('11')).toEqual('11')
//     expect(checkSecond('-1')).toEqual('59')
//     expect(hmsToSecondsOnly('1:30')).toEqual(90)
// })

describe('AuthGuard Behavior Test', () => {
    let wrapper
    let timeRemaining = '1:30'

    beforeAll(() => {
        jest.useFakeTimers()
        jest.spyOn(authHook, 'default').mockImplementation(() => {
            return {
                isAuthenticated: true,
                timeRemaining: '1:30',
            }
        })

        wrapper = mount(
            <BrowserRouter>
                <AuthGuard />
            </BrowserRouter>
        )
    })

    afterAll(() => {
        wrapper.unmount()
        jest.clearAllMocks()
        jest.useRealTimers()
    })

    it('AuthGuard should render', () => {
        expect(wrapper.length).toEqual(1)
    })
})
