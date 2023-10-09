import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: '',
  age: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    setAge: (state, action) => {
      state.age = action.payload
    },
    increaseAge: (state) => {
      state.age += 1
    },
  }
})

export const selectName = (state) => state.user.name
export const selectAge = (state) => state.user.age

export const { setName, setAge, increaseAge } = userSlice.actions

export default userSlice.reducer
