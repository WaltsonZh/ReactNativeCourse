import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/users/userSlice'
import citiesReducer from '../redux/cities/citiesSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    cities: citiesReducer,
  },
})
