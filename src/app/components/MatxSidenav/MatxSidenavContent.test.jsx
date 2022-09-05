import React from 'react'
import { mount } from 'enzyme'
import MatxSidenavContent from './MatxSidenavContent'
import { BrowserRouter } from 'react-router-dom'

describe('MatxSidenavContent Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <MatxSidenavContent />
            </BrowserRouter>
        )
    })

    it('MatxSidenavContent should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
