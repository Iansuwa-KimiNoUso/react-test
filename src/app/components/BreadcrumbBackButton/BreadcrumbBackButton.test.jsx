import React from 'react'
import { mount } from 'enzyme'
import BreadcrumbBackButton from './BreadcrumbBackButton'
import { BrowserRouter } from 'react-router-dom'

describe('BreadcrumbBackButton Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <BreadcrumbBackButton />
            </BrowserRouter>
        )
    })

    it('BreadcrumbBackButton should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
