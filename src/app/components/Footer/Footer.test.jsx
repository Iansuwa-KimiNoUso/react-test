import React from 'react'
import { mount } from 'enzyme'
import Footer from './Footer'
import { BrowserRouter } from 'react-router-dom'

describe('Footer Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        )
    })

    it('Footer should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
