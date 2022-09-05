import React, { useEffect, useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom'

import useAuth from 'app/hooks/useAuth'
// import TimeRemaining from './TimeRemaining'

// export const checkSecond = (sec) => {
//     if (sec < 10 && sec >= 0) {
//         sec = '0' + sec
//     }
//     if (sec < 0) {
//         sec = '59'
//     }
//     return sec
// }

// export const hmsToSecondsOnly = (str) => {
//     var p = str.split(':'),
//         s = 0,
//         m = 1

//     while (p.length > 0) {
//         s += m * parseInt(p.pop(), 10)
//         m *= 60
//     }

//     return s
// }

const AuthGuard = ({ children }) => {
    // const { isAuthenticated, timeRemaining, logout } = useAuth()

    const { isAuthenticated } = useAuth()

    const [previouseRoute, setPreviousRoute] = useState(null)
    // const [time, setTime] = useState('')

    const { pathname } = useLocation()

    let authenticated = isAuthenticated

    // let defaultTime = timeRemaining

    // const authTimer = () => {
    //     var presentTime = defaultTime
    //     var timeArray = presentTime.split(/[:]+/)
    //     var m = timeArray[0]
    //     var s = checkSecond(timeArray[1] - 1)
    //     if (s === 59) {
    //         m = m - 1
    //     }
    //     if (m < 0) {
    //         return
    //     }

    //     defaultTime = m + ':' + s
    //     setTime(defaultTime)
    //     setTimeout(authTimer, 1000)
    // }

    useEffect(() => {
        if (previouseRoute !== null) setPreviousRoute(pathname)
    }, [pathname, previouseRoute])

    if (authenticated) {
        // let timeRemainingComponent

        // if (hmsToSecondsOnly(time) <= hmsToSecondsOnly('2:00')) {
        //     timeRemainingComponent = (
        //         <TimeRemaining
        //             open={true}
        //             timeLeft={time}
        //             timeRemaining={timeRemaining}
        //             logout={logout}
        //         />
        //     )
        // } else if (hmsToSecondsOnly(time) === hmsToSecondsOnly('0:00')) {
        //     logout()
        // }
        return (
            <>
                {/* {timeRemainingComponent} */}
                {children}
            </>
        )
    } else {
        return (
            <Redirect
                to={{
                    pathname: '/home',
                    state: { redirectUrl: previouseRoute },
                }}
            />
        )
    }
}

export default AuthGuard
