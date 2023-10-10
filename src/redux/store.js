import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/users/userSlice'
import citiesReducer from '../redux/cities/citiesSlice'
import notificationsReducer from '../redux/notifications/notificationSlices'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cities: citiesReducer,
    notifications: notificationsReducer,
  },
})
