import * as React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import _ from 'lodash'

import SCPagination from 'app/components/SCPagination/SCPagination'


describe('SCPagination Unit Test', () => {
    let wrapper

    const props = {
        style: { marginRight: '24px' },
        component: "div",
        count: 10,
        rowsPerPageOptions: [10],
        rowsPerPage: 10,
        page: 0,
        onPageChange: jest.fn()
    }

    beforeEach(() => {
        wrapper = mount(<SCPagination {...props} />)
    })

    it('Should render', () => {
        expect(wrapper.length).toEqual(1)
    })

    it('Should be able to handle pagination actions', () => {
        const paginationButtonIds = [
            'firstPageBtn',
            'backBtn',
            'nextBtn',
            'lastPageBtn',
        ]

        _.forEach(paginationButtonIds, (value, index) => {
            act(() => {
                wrapper.find(`#${value}`).first().props().onClick()
            })
            wrapper.update()
            expect(props.onPageChange).toHaveBeenCalledTimes(index + 1)
        })
    })


})
