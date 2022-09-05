import React from 'react'
import { mount } from 'enzyme'
import SuspenseMatx from 'app/components/MatxSuspense/MatxSuspense'
import { BrowserRouter } from 'react-router-dom'

describe('MatxSuspense Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <SuspenseMatx />
            </BrowserRouter>
        )
    })

    it('MatxSuspense should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
