import React from 'react'
import { mount } from 'enzyme'
import IdleTimer from 'app/auth/IdleTimer'
import { BrowserRouter } from 'react-router-dom'
import { act } from '@testing-library/react'

describe('IdleTimer Unit Tests', () => {
    let wrapper
    let prop = {
        children: <div>test</div>,
    }
    let reloadMock = jest.fn()

    beforeAll(() => {
        jest.useFakeTimers()
        jest.runOnlyPendingTimers()
        delete window.location
        window.location = { reload: reloadMock }

        jest.spyOn(
            Object.getPrototypeOf(window.sessionStorage),
            'getItem'
        ).mockResolvedValueOnce(1000)

        wrapper = mount(
            <BrowserRouter>
                <IdleTimer {...prop}></IdleTimer>
            </BrowserRouter>
        )
    })

    afterAll(() => {
        wrapper.unmount()
        jest.clearAllMocks()
        jest.useRealTimers()
        // reloadMock.clearAllMocks()
    })

    it('IdleTimer should render', () => {
        expect(wrapper.length).toEqual(1)
    })

    it('should show modal when idle', () => {
        act(() => {
            jest.advanceTimersByTime(100)

            wrapper.update()
        })

        act(() => {
            wrapper.find('SCModal').props().handleOk()

            wrapper.update()
        })

        expect(wrapper.find('SCModal').props().openDialog).toBeFalsy()
    })

    it('should show modal when idle', () => {
        act(() => {
            jest.advanceTimersByTime(100)

            wrapper.update()
        })

        act(() => {
            wrapper.find('SCModal').props().handleCancel()

            wrapper.update()
        })

        expect(wrapper.find('SCModal').props().openDialog).toBeFalsy()
    })

    it('Should show expiration when expired', () => {
        act(() => {
            jest.advanceTimersByTime(90000)
            wrapper.update()
            wrapper.find('SCModal').props().handleOk()
        })

        expect(wrapper.find('SCModal').props().openDialog).toBeTruthy()
    })
})
