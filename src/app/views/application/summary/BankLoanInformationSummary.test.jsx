import React from 'react'
import { mount } from 'enzyme'
import BankLoanInformationSummary from './BankLoanInformationSummary'


describe('Behavior and Render Test', () => {
  let wrapper

  const props = {
    item: {
      accountType: '',
      accountHolderName: '',
      accountNumber: '',
      bankName: '',
      province: '',
      branchName: '',
      buyersCompanyName: '',
      loanPurpose: '',
    }
  }
 
  beforeEach(() => {
    wrapper = mount(<BankLoanInformationSummary {...props} />)
  })

  it('should render', () => {
    expect(wrapper.length).toEqual(1)
  })
})
