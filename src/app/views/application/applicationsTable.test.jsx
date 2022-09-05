import * as React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import History from 'history.js'

import ApplicationsTable from 'app/views/application/applicationsTable'


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
}

describe('ApplicationsTable Unit Test', () => {
    describe('Render with data', () => {
        let wrapper
        let historySpy

        const props = {
            applications: [
                {
                    applicationDate: '18/03/2022 15:05:53',
                    applicationId: 'ff7e96a5-6874-4fdf-8cf3-af6f987a39f3',
                    companyNameEn: 'อาหารกินดี',
                    companyNameTh: 'อาหารกินดี',
                    productName: 'ผลิตภัณฑ์สินเชื่อห่วงโซ่อุปทาน',
                    status: 'Pending',
                },
            ],
            pagination: {
                offset: 0,
                pagesize: 10,
                totalRecords: 1,
            },
            isFetching: false,
        }

        beforeEach(() => {
            const translations = jest.requireActual('app/hooks/translations')
            jest.spyOn(translations, 'default').mockReturnValue(
                mockTranslationValue
            )
            historySpy = jest.spyOn(History, 'push')

            wrapper = mount(<ApplicationsTable {...props} />)
        })

        it('Should render', () => {
            expect(wrapper.length).toEqual(1)
        })

        it('Should be able to click application Id', () => {
            act(() => {
                wrapper
                    .find('#applicationID')
                    .first()
                    .props()
                    .onClick({ preventDefault: jest.fn })
            })

            expect(historySpy).toBeCalled()
        })
    })

    describe('Render loading state', () => {
        let wrapper

        const props = {
            applications: [],
            pagination: {
                offset: 1,
                pagesize: 10,
                totalRecords: 0,
            },
            isFetching: true,
        }

        beforeEach(() => {
            const translations = jest.requireActual('app/hooks/translations')
            jest.spyOn(translations, 'default').mockReturnValue(
                mockTranslationValue
            )

            wrapper = mount(<ApplicationsTable {...props} />)
        })

        it('Should render loading', () => {
            expect(
                wrapper.find('WithStyles(ForwardRef(CircularProgress))').length
            ).toEqual(1)
        })
    })

    describe('Render no data state', () => {
        let wrapper

        const props = {
            applications: [],
            pagination: {
                offset: 1,
                pagesize: 10,
                totalRecords: 0,
            },
            isFetching: false,
        }

        beforeEach(() => {
            const translations = jest.requireActual('app/hooks/translations')
            jest.spyOn(translations, 'default').mockReturnValue(
                mockTranslationValue
            )

            wrapper = mount(<ApplicationsTable {...props} />)
        })

        it('Should render no data placeholder', () => {
            expect(wrapper.find('p[id="noDataPlaceHolder"]').length).toBe(1)
        })
    })
})