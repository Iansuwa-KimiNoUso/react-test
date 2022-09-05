import React from 'react'
import { mount } from 'enzyme'
import MatxListItem1 from './MatxListItem1'
import { BrowserRouter } from 'react-router-dom'

describe('MatxListItem1 Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <MatxListItem1 />
            </BrowserRouter>
        )
    })

    it('MatxListItem1 should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
