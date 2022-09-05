import React from 'react'
import { mount } from 'enzyme'
import TopbarMenu from './TopbarMenu'
import { BrowserRouter } from 'react-router-dom'
import { Store } from 'app/redux/Store'
import { Provider } from 'react-redux'

describe('TopbarMenu Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <Provider store={Store}>
                <BrowserRouter>
                    <TopbarMenu />
                </BrowserRouter>
            </Provider>
        )
    })
    it('TopbarMenu should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})