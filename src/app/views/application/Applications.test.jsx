import * as React from 'react'
import { mount } from 'enzyme'
import { useSelector, Provider } from 'react-redux'
import { Store } from 'app/redux/Store'
import axios from 'axios.js'

import Applications from 'app/views/application/Applications'
import { act } from 'react-dom/test-utils'

const { REACT_APP_API } = process.env
const mockTranslationValue = {
    applications_page: {
        applications: 'Applications',
        registration_applications: 'Registration Applications',
        app_id: 'App ID',
        supplier: 'Supplier',
        product: 'Product',
        request_date: 'Request Date',
        status: 'Status',
        no_applications: 'There are no applications',
        pending: 'Pending',
        drafted: 'Drafted',
        approved: 'Approved',
        rejected: 'Rejected',
        withdrawn: 'Withdrawn',
    },
    pagination: {
        showing: 'Showing',
        of: 'of',
    },
}

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}))

function waitForRequests(delay) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

describe('Applications Page Unit Test', () => {
    let wrapper
    let getApplicationsSpy 

    beforeEach(async () => {
        const translations = jest.requireActual('app/hooks/translations')
        jest.spyOn(translations, 'default').mockReturnValue(
            mockTranslationValue
        )

        getApplicationsSpy = jest.spyOn(axios, 'get').mockResolvedValue({
            data: {
                applicationList: [
                    {
                        applicationDate: '18/03/2022 15:05:53',
                        applicationId: 'ff7e96a5-6874-4fdf-8cf3-af6f987a39f3',
                        companyNameEn: 'อาหารกินดี',
                        companyNameTh: 'อาหารกินดี',
                        productName: 'ผลิตภัณฑ์สินเชื่อห่วงโซ่อุปทาน',
                        status: 'Pending',
                    },
                ],
                pageable: {
                    offset: 0,
                    pageSize: 10,
                    totalRecords: 1,
                },
            },
        })


        useSelector.mockImplementation((callback) => {
            return callback({
                applications: {
                    applications: [
                        {
                            applicationDate: '18/03/2022 15:05:53',
                            applicationId:
                                'ff7e96a5-6874-4fdf-8cf3-af6f987a39f3',
                            companyNameEn: 'อาหารกินดี',
                            companyNameTh: 'อาหารกินดี',
                            productName: 'ผลิตภัณฑ์สินเชื่อห่วงโซ่อุปทาน',
                            status: 'Pending',
                        },
                    ],
                    pagination: {
                        offset: 0,
                        pageSize: 10,
                        totalRecords: 1,
                    },
                    isFetching: false,
                },
            })
        })

        await waitForRequests(1000)

        wrapper = mount(
            <Provider store={Store}>
                <Applications/>
            </Provider>
        )
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('Should Render', () => {
        expect(wrapper.length).toEqual(1)
    })

    it('Should handle page change', async () => {
        act(() => {
            wrapper.find('#applicationsPagination').props().onPageChange({}, 1)
        })
        wrapper.update()
        await waitForRequests(1)
        expect(getApplicationsSpy).toBeCalled()
    })
})