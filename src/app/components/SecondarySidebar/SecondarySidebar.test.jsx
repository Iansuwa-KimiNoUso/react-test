import React from 'react'
import { mount } from 'enzyme'
import SecondarySidebar from './SecondarySidebar'
import { BrowserRouter } from 'react-router-dom'

describe('SecondarySidebar Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <SecondarySidebar />
            </BrowserRouter>
        )
    })

    it('SecondarySidebar should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
