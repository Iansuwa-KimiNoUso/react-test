import React from 'react'
import { mount } from 'enzyme'
import SecondarySidebarContent from './SecondarySidebarContent'
import { BrowserRouter } from 'react-router-dom'

describe('SecondarySidebarContent Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <SecondarySidebarContent />
            </BrowserRouter>
        )
    })

    it('SecondarySidebarContent should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
