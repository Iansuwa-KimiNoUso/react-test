import React from 'react'
import { mount } from 'enzyme'
import MatxSidenavContainer from './MatxSidenavContainer'
import { BrowserRouter } from 'react-router-dom'

describe('MatxSidenavContainer Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <MatxSidenavContainer />
            </BrowserRouter>
        )
    })

    it('MatxSidenavContainer should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
