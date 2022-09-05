import * as React from 'react'
import { mount } from 'enzyme'
import { useSelector, Provider } from 'react-redux'
import { Store } from 'app/redux/Store'
import History from 'history.js'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

import ApplicationSummary from 'app/views/application/ApplicationSummary'

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}))

describe('ApplicationSummary Unit Test', () => {

    let wrapper
    const theme = createTheme()

    describe('Render with props', () => {
        beforeEach(() => {
            const props = {
                location: {
                    state: {
                        appID: 'appID',
                    },
                },
            }

            mockUseSelector()

            wrapper = mount(
                <Provider store={Store}>
                    <ThemeProvider theme={theme}>
                        <ApplicationSummary { ...props } />
                    </ThemeProvider>
                </Provider>
            )
        })

        afterEach(() => {
            jest.restoreAllMocks()
        })

        it('Should Render', () => {
            expect(wrapper.length).toEqual(1)
        })
    })

    describe('Render without props', () => {
        let historySpy
        beforeEach(() => {
            historySpy = jest.spyOn(History, 'push')

            mockUseSelector()

            wrapper = mount(
                <Provider store={Store}>
                    <ApplicationSummary />
                </Provider>
            )
        })

        afterEach(() => {
            jest.restoreAllMocks()
        })

        it('Should push back to applications', () => {
            expect(historySpy).toBeCalled()
        })
    })
})

function mockUseSelector() {
    useSelector.mockImplementation((callback) => {
        return callback({
            applicationSummary: {
                applicationSummary: {
                    application: [
                        {
                            companyDetails: {
                                businessType: 1,
                                companyNameEn: 'อาหารกินดี',
                                companyNameTh: 'อาหารกินดี',
                                companyRegistrationNo: '2000000000099',
                                companyWebsite: '',
                                country: 'Thailand',
                                dateOfIncorporation: '16/03/2016',
                                registeredCompanyAddress: 'c',
                                numberOfEmployees: '0',
                                postalCode: '10100',
                                typeOfEntity: 1,
                                industry: 2,
                                province: 10,
                                district: 9408,
                                subdistrict: 100101,
                                vendorCode: '200099',
                                vendorSite: ['200099'],
                            },
                            personalDetails: [],
                            shareHolderDetails: [],
                            bankDetailsEntity: {},
                            applicationId: 'applicationID',
                            applicationDate: '10/10/2020 10:10:10',
                            status: 'pending',
                            vendorCode: '200099',
                        },
                    ],
                    documents: [
                        {
                            documentId:
                                '1647590515855-136a4f41-faaf-4977-b96e-4dc556b47d0d',
                            documentName: 'MicrosoftTeams-image (1).png',
                            documentSize: 703076,
                            documentType: 'png',
                            group: 'authDirectorNationalId',
                            referenceId: 'ff7e96a5-6874-4fdf-8cf3-af6f987a39f3',
                        },
                    ],
                },
            },
            appDownloadDocs: {
                downloadDocsLoading: false,
            },
            referrentialData: {
                typeOfEntity: [
                    {
                        code: 1,
                        name: 'Ordinary Partnership',
                        nameTh: 'ห้างหุ้นส่วนสามัญ',
                    },
                ],
                industry: [
                    {
                        code: 2,
                        name: 'Consumer Goods',
                        nameTh: 'สินค้าอุปโภคบริโภค',
                    },
                ],
                businessType: [
                    {
                        code: 1,
                        name: 'Agribusiness',
                        nameTh: 'ธุรกิจการเกษตร',
                    },
                ],
                provinces: [
                    {
                        code: 10,
                        name: 'Bangkok',
                        nameTh: 'กรุงเทพมหานคร',
                    },
                ],
                districts: [
                    {
                        code: 9408,
                        name: 'Mai Kaen',
                        nameTh: 'ไม้แก่น',
                    },
                ],
                subDistricts: [
                    {
                        code: 100101,
                        name: 'Phra Borom Maha Ratchawang',
                        nameTh: 'พระบรมมหาราชวัง',
                    },
                ],
            },
        })
    })
}