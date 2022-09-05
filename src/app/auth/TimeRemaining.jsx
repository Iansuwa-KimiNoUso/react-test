import React from 'react'
import SCModal from 'app/components/SCModal/SCModal'

const TimeRemaining = (props) => {
    const handleLogout = (e) => {
        props.logout()
    }

    const handleRenew = (e) => {
        console.log('RENEW TOKEN')
    }

    return (
        <SCModal
            handleCancel={handleLogout}
            handleOk={handleRenew}
            openDialog={props.open}
            title={'Session time remaining'}
            content={`You only have ${props.timeLeft} minutes before your session expires`}
            cancel={'Logout'}
            ok={'Renew Session'}
        />
    )
}

export default TimeRemaining
