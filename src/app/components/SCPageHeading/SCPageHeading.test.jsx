import React from 'react'
import { mount } from 'enzyme'
import SCPageHeading from './SCPageHeading'
import { BrowserRouter } from 'react-router-dom'

describe('SCPageHeading Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <SCPageHeading />
            </BrowserRouter>
        )
    })

    it('SCPageHeading should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
