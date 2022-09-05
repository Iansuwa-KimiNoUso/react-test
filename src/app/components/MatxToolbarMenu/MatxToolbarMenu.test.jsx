import React from 'react'
import { mount } from 'enzyme'
import MatxToolbarMenu from './MatxToolbarMenu'
import { BrowserRouter } from 'react-router-dom'

describe('MatxToolbarMenu Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <MatxToolbarMenu />
            </BrowserRouter>
        )
    })

    it('MatxToolbarMenu should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
