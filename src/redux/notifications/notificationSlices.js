import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  expoPushToken: '',
  notification: false,
  notificationListener: null,
  responseListener: null,
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setExpoPushToken: (state, action) => {
      state.expoPushToken = action.payload
    },
    setNotification: (state, action) => {
      state.notification = action.payload
    },
  },
})

export const { setExpoPushToken, setNotification } = notificationsSlice.actions

export const selectExpoPushToken = (state) => state.notifications.expoPushToken
export const selectNotification = (state) => state.notifications.notification
export const selectNotificationListener = (state) => state.notifications.notificationListener
export const selectResponseListener = (state) => state.notifications.responseListener

export default notificationsSlice.reducer
