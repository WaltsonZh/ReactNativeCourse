import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: [],
  taskId: 1,
}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload
    },
    setTaskId: (state, action) => {
      state.taskId = action.payload
    },
  },
})

export const selectTask = (state) => state.task

export const { setTasks, setTaskId } = taskSlice.actions

export default taskSlice.reducer
