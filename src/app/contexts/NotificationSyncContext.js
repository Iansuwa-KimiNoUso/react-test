import React, { createContext } from 'react'

const NotificationSyncContext = createContext()

export const NotificationSyncProvider = ({ children,value }) => {
    return (
        <NotificationSyncContext.Provider value={value}>
            {children}
        </NotificationSyncContext.Provider>
    )
}

export default NotificationSyncContext
