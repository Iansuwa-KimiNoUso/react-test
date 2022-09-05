import React from 'react'
import { mount } from 'enzyme'
import { MatxTheme } from 'app/components'
import { BrowserRouter } from 'react-router-dom'

describe('MatxCssVars Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <MatxTheme />
            </BrowserRouter>
        )
    })

    it('MatxCssVars should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
