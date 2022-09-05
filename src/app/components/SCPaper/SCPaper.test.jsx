import React from 'react'
import { mount } from 'enzyme'
import SCPaper from './SCPaper'
import { BrowserRouter } from 'react-router-dom'

describe('SCPaper Unit Tests', () => {
    
    describe('Mount with props', () => {
        const props = {
            title: 'test',
        }
        let wrapper
        beforeEach(() => {
            wrapper = mount(
                <BrowserRouter>
                    <SCPaper {...props} />
                </BrowserRouter>
            )
        })

        it('SCPaper should render', () => {
            expect(wrapper.length).toEqual(1)
            wrapper.unmount()
        })
    })

    describe('Mount without props', () => {

        let wrapper
        beforeEach(() => {
            wrapper = mount(
                <BrowserRouter>
                    <SCPaper />
                </BrowserRouter>
            )
        })

        it('SCPaper should render', () => {
            expect(wrapper.length).toEqual(1)
            wrapper.unmount()
        })
    })
})
