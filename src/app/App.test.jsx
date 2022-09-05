import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Store } from 'app/redux/Store'
import { Provider } from 'react-redux'

describe('App Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <Provider store={Store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        )
    })

    it('App should render', () => {
        expect(wrapper.length).toEqual(1)
        wrapper.unmount()
    })
})
