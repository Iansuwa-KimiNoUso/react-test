import React from 'react'
import { mount } from 'enzyme'
import PersonalDetailsSummary from './PersonalDetailsSummary'


describe('Behavior and Render Test', () => {
  let wrapper
  const props = {
    item: [
      {
        firstNameEn: 'firstname',
        lastNameEn: 'lastname',
        firstNameTH: 'firstnameth',
        lastNameTh: 'lastnameth',
        nationality: 'nationality',
        nationalIDcard: 'nationalcard',
        nationalIdCardNo: 'nationalcardno',
        laserNumber: 'laserNumber',
        passportNo: 'passportNo',
        dateOfBirth: 'dateOfBirth',
        countryCode: 'countryCode',
        mobileNumber: 'mobileNumber',
        emailAddress: 'emailAddress',
        jobTitle: 'jobTitle',
        percentageOfAllocatedShares: 'percentageOfAllocatedShares',
      }
    ]
  }

  beforeEach(() => {
    wrapper = mount(<PersonalDetailsSummary {...props} />)
  })
  it('Should render', () => {
    expect(wrapper.length).toEqual(1)
  })
})
