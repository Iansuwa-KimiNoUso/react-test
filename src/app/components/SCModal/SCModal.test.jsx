import React from 'react'
import { mount } from 'enzyme'
import ModalSC from './SCModal'

describe('SCModal Unit Tests', () => {
    describe('Mount SCModal with props and dialog is open', () => {
        const props = {
            handleCancel: jest.fn(),
            handleOk: jest.fn(),
            openDialog: true,
            cancel: 'cancel',
            ok: 'ok',
        }
        let wrapper
        beforeAll(() => {
            wrapper = mount(<ModalSC { ...props }/>)
        })

        afterAll(() => {
            wrapper.unmount()
        })

        it('SCModal should render', () => {
            expect(wrapper.length).toEqual(1)
        })

        it('Should handle events', () => {
            const cancelButton = wrapper
                .find('#SCModalCancelButton')
                .first()
                .props()

            const okButton = wrapper
                .find('#SCModalOkButton')
                .first()
                .props()


            cancelButton.buttonClick(jest.fn(), jest.fn(), {})
            expect(props.handleCancel).toBeCalled()
            okButton.buttonClick(jest.fn(), jest.fn(), {})
            expect(props.handleOk).toBeCalled()

        })
    })

    describe('Mount SCModal without cancel props and dialog is open', () => {
        const props = {
            handleOk: jest.fn(),
            openDialog: true,
            ok: 'ok',
        }
        let wrapper
        beforeAll(() => {
            wrapper = mount(<ModalSC { ...props }/>)
        })

        afterAll(() => {
            wrapper.unmount()
        })

        it('SCModal should render', () => {
            expect(wrapper.length).toEqual(1)
        })
    })

    describe('Mount SCModal without props', () => {
        let wrapper
        beforeEach(() => {
            wrapper = mount(<ModalSC />)
        })

        it('SCModal should render', () => {
            expect(wrapper.length).toEqual(1)
            wrapper.unmount()
        })
    })
})
