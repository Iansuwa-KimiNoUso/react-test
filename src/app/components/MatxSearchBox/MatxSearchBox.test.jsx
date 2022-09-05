import React from 'react'
import { mount } from 'enzyme'
import MatxSearchBox from './MatxSearchBox'
import { BrowserRouter } from 'react-router-dom'

describe('MatxSearchBox Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <MatxSearchBox />
            </BrowserRouter>
        )
    })

    it('MatxSearchBox should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
