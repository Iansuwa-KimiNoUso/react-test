import React from 'react'
import { mount } from 'enzyme'
import SCApiLoading from './SCApiLoading'
import { BrowserRouter } from 'react-router-dom'

describe('SCApiLoading Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <SCApiLoading />
            </BrowserRouter>
        )
    })

    it('SCApiLoading should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
