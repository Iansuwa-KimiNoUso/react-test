import React from 'react'
import { mount } from 'enzyme'
import SCUploadButton from 'app/components/SCUploadButton/SCUploadButton'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { Store } from 'app/redux/Store'
import { Provider } from 'react-redux'
import { act } from '@testing-library/react'

describe('SCUploadButton UI Behavior Unit Tests', () => {
    describe('Type = button', () => {
        let wrapper
        let requiredErrorMock
        const onChangeMock = jest.fn()
        const theme = createTheme()

        beforeAll(() => {
            wrapper = mount(
                <Provider store={Store}>
                    <ThemeProvider theme={theme}>
                        <BrowserRouter>
                            <SCUploadButton
                                id="uploadDocument_authDirectorNationalId"
                                type="upload"
                                requiredError={requiredErrorMock}
                                outlined
                                style={{ marginTop: 20 }}
                                text="upload"
                                width={155}
                                height={40}
                                onChange={onChangeMock}
                            />
                        </BrowserRouter>
                    </ThemeProvider>
                </Provider>
            )
        })

        afterAll(() => {
            wrapper.unmount()
            jest.clearAllMocks()
        })

        it('Should render', () => {
            expect(wrapper.length).toEqual(1)
        })

        it('Should handle component handlers', () => {
            act(() => {
                wrapper.find('input').props().onChange()
            })

            expect(onChangeMock).toBeCalled()
        })
    })

    describe('Type = textOnly, class=outlined', () => {
        let wrapper
        let requiredErrorMock
        const buttonClickMock = jest.fn()
        const theme = createTheme()

        beforeAll(() => {
            wrapper = mount(
                <Provider store={Store}>
                    <ThemeProvider theme={theme}>
                        <BrowserRouter>
                            <SCUploadButton
                                id="uploadDocument_authDirectorNationalId"
                                textOnly
                                type="upload"
                                requiredError
                                outlined
                                style={{ marginTop: 20 }}
                                text="upload"
                                buttonClick={buttonClickMock}
                            />
                        </BrowserRouter>
                    </ThemeProvider>
                </Provider>
            )
        })

        afterAll(() => {
            wrapper.unmount()
            jest.clearAllMocks()
        })

        it('Should render', () => {
            expect(wrapper.length).toEqual(1)
        })

        it('Should handle button clicks', () => {
            act(() => {
                wrapper.find('WithStyles(ForwardRef(Button))').props().onClick()
            })

            expect(buttonClickMock).toBeCalled()
        })
    })

    describe('Type = textOnly, class=contained, no handler', () => {
        let wrapper
        let requiredErrorMock
        const buttonClickMock = jest.fn()
        const theme = createTheme()

        beforeAll(() => {
            wrapper = mount(
                <Provider store={Store}>
                    <ThemeProvider theme={theme}>
                        <BrowserRouter>
                            <SCUploadButton
                                id="uploadDocument_authDirectorNationalId"
                                textOnly
                                type="upload"
                                requiredError={requiredErrorMock}
                                contained
                                style={{ marginTop: 20 }}
                                text="upload"
                                width={155}
                                height={40}
                            />
                        </BrowserRouter>
                    </ThemeProvider>
                </Provider>
            )
        })

        afterAll(() => {
            wrapper.unmount()
            jest.clearAllMocks()
        })

        it('Should render', () => {
            expect(wrapper.length).toEqual(1)
        })

        it('Should handle button clicks', () => {
            act(() => {
                wrapper.find('WithStyles(ForwardRef(Button))').props().onClick()
            })

            expect(buttonClickMock).toBeCalledTimes(0)
        })
    })

    describe('Redirect mode', () => {
        let wrapper
        let requiredErrorMock
        let onChangeMock = jest.fn()
        const theme = createTheme()

        beforeAll(() => {
            wrapper = mount(
                <Provider store={Store}>
                    <ThemeProvider theme={theme}>
                        <BrowserRouter>
                            <SCUploadButton
                                id="uploadDocument_authDirectorNationalId"
                                to="/home"
                                type="upload"
                                requiredError={requiredErrorMock}
                                outlined
                                style={{ marginTop: 20 }}
                                text="upload"
                                width={155}
                                height={40}
                                onChange={(e) => onChangeMock}
                            />
                        </BrowserRouter>
                    </ThemeProvider>
                </Provider>
            )
        })

        afterAll(() => {
            wrapper.unmount()
            jest.clearAllMocks()
        })

        it('Should render', () => {
            expect(wrapper.length).toEqual(1)
        })
    })
})
