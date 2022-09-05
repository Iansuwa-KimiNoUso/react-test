import React from 'react'
import { mount } from 'enzyme'
import MatxProgressBar from './MatxProgressBar'
import { BrowserRouter } from 'react-router-dom'

describe('MatxProgressBar Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <MatxProgressBar />
            </BrowserRouter>
        )
    })

    it('MatxProgressBar should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
