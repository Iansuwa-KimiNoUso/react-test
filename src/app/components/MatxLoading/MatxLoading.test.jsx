import React from 'react'
import { mount } from 'enzyme'
import LoadingMatx from 'app/components/MatxLoading/MatxLoading'
import { BrowserRouter } from 'react-router-dom'

describe('MatxLoading Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <LoadingMatx />
            </BrowserRouter>
        )
    })

    it('MatxLoading should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
