import { useContext } from 'react'
import NotificationSyncContext from '../contexts/NotificationSyncContext'

const useNotificationSyncHook = () => useContext(NotificationSyncContext)

export default useNotificationSyncHook
