import React from 'react'
import { mount } from 'enzyme'
import Brand from './Brand'
import { BrowserRouter } from 'react-router-dom'

describe('Brand Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <Brand />
            </BrowserRouter>
        )
    })

    it('Brand should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
