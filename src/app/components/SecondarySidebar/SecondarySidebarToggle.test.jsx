import React from 'react'
import { mount } from 'enzyme'
import SecondarySidebarToggle from './SecondarySidebarToggle'
import { BrowserRouter } from 'react-router-dom'

describe('SecondarySidebarToggle Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <SecondarySidebarToggle />
            </BrowserRouter>
        )
    })

    it('SecondarySidebarToggle should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
