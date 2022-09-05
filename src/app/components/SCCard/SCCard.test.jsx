import React from 'react'
import { mount } from 'enzyme'
import SCCard from './SCCard'
import { BrowserRouter } from 'react-router-dom'

describe('SCCard Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <SCCard />
            </BrowserRouter>
        )
    })

    it('SCCard should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
