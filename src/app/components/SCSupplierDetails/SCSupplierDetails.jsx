import React, { useEffect } from 'react'
import useAuth from 'app/hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { getSupplierDetails } from 'app/redux/actions/SupplierActions'

const SCSupplierDetails = (props) => {
    const { authData } = useAuth()
    const dispatch = useDispatch()
    const { supplierDetails: user } = useSelector((state) => state.supplier)

    useEffect(() => {
        if (user.length === 0) {
            const { businessProfileId } =
                authData['https://api.abc.com/user_info']
            dispatch(getSupplierDetails(businessProfileId))
        }
    }, [user, authData, dispatch])

    return <>{props.children}</>
}

export default SCSupplierDetails
