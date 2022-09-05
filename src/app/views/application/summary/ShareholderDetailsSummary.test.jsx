import React from 'react'
import { mount } from 'enzyme'
import ShareholderDetailsSummary from './ShareholderDetailsSummary'

describe('Behavior and Render Test', () => {
    let wrapper
    const props = {
        item: [
            {
                firstNameEn: 'firstname',
                lastNameEn: 'lastname',
                firstNameTh: 'th',
                lastNameTh: 'th',
                nationality: 'thai',
                nationalIdCardNo: '',
                laserNumber: '',
                passportNo: '',
                percentageOfAllocatedShares: '',
            },
        ],
    }

    beforeEach(() => {
        wrapper = mount(
            <ShareholderDetailsSummary { ...props }/>
        )
    })

    it('Should render', () => {
        expect(wrapper.length).toEqual(1)

    })
})

