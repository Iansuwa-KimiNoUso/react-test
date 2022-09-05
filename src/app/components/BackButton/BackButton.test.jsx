import React from 'react'
import { mount } from 'enzyme'
import BackButton from './BackButton'
import { BrowserRouter } from 'react-router-dom'

describe('BackButton Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <BackButton />
            </BrowserRouter>
        )
    })

    it('BackButton should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
