import React from 'react'
import { mount } from 'enzyme'
import MatxDivider from './MatxDivider'
import { BrowserRouter } from 'react-router-dom'

describe('MatxDivider Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <MatxDivider />
            </BrowserRouter>
        )
    })

    it('MatxDivider should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
