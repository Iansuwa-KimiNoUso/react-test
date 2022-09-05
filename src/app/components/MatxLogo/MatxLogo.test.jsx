import React from 'react'
import { mount } from 'enzyme'
import MatxLogo from './MatxLogo'
import { BrowserRouter } from 'react-router-dom'

describe('MatxLogo Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <MatxLogo />
            </BrowserRouter>
        )
    })

    it('MatxLogo should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
