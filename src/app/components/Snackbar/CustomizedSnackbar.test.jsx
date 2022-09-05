import React from 'react'
import { mount } from 'enzyme'
import CustomizedSnackbars, {
    MySnackbarContentWrapper,
    ScreenWidth,
} from './CustomizedSnackbar'
import { BrowserRouter } from 'react-router-dom'

describe('CustomizedSnackbar Unit Tests', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(
            <BrowserRouter>
                <CustomizedSnackbars />
            </BrowserRouter>
        )
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('CustomizedSnackbar should render', () => {
        expect(wrapper.length).toEqual(1)
    })

    it('MySnackbarContentWrapper renders correctly', () => {
        const props = {
            classes: {
                barContent: 'makeStyles-barContent-37',
                error: 'makeStyles-error-30',
                icon: 'makeStyles-icon-33',
                iconVariant: 'makeStyles-iconVariant-34',
                info: 'makeStyles-info-31',
                margin: 'makeStyles-margin-36',
                messageCss: 'makeStyles-messageCss-35',
                success: 'makeStyles-success-29',
                warning: 'makeStyles-warning-32',
            },
            direction: 'down',
            message: 'ส่งรหัสใหม่ไปที่ mer***@*** เรียบร้อยแล้ว',
            variant: 'info',
        }

        MySnackbarContentWrapper(props)
    })

    it('Should render window screen less than 1024 and greater than 600', () => {
        jest.spyOn(window.screen, 'width', 'get').mockReturnValue(1000)
        ScreenWidth()
    })
    it('Should render based on window screen less than 600', () => {
        jest.spyOn(window.screen, 'width', 'get').mockReturnValue(599)
        ScreenWidth()
    })
    it('Should render based on window screen greater than 1024', () => {
        jest.spyOn(window.screen, 'width', 'get').mockReturnValue(1025)
        ScreenWidth()
    })
})
