import React from 'react'
import { mount } from 'enzyme'
import Breadcrumb from './Breadcrumb'
import { BrowserRouter } from 'react-router-dom'

describe('Breadcrumb Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <Breadcrumb />
            </BrowserRouter>
        )
    })

    it('Breadcrumb should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
