import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const CITIES_URL = 'http://10.1.1.10:8000/cities'

const initialState = {
  cities: [],
  status: 'idle',
}

export const fetchCities = createAsyncThunk('cities/fetchCities', async () => {
  try {
    const response = await fetch(CITIES_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
    return err.message
  }
})

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = 'failed'
        console.log('Error: ', action.error.message)
      })
  },
})

export const selectCities = (state) => state.cities

export default citiesSlice.reducer
