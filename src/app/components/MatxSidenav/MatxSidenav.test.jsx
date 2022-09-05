import React from 'react'
import { mount } from 'enzyme'
import MatxSidenav from './MatxSidenav'
import { BrowserRouter } from 'react-router-dom'

describe('MatxSidenav Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <MatxSidenav />
            </BrowserRouter>
        )
    })

    it('MatxSidenav should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
