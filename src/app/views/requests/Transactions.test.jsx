import React from 'react'
import { mount } from 'enzyme'
import Transactions from './Transactions'
import { BrowserRouter } from 'react-router-dom'

describe('Transactions Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <Transactions />
            </BrowserRouter>
        )
    })

    it('Transactions should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
