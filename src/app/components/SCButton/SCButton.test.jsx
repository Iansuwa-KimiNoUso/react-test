import React from 'react'
import { mount } from 'enzyme'
import SCButton from './SCButton'
import { BrowserRouter } from 'react-router-dom'

describe('SCButton Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <SCButton />
            </BrowserRouter>
        )
    })

    it('SCButton should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
