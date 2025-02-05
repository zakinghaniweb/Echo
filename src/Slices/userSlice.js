import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: JSON.parse(localStorage.getItem('user')) || null,
  },
  reducers: {
    userData: (state, action) => {
      state.value = action.payload
    },
    clearUser: (state) => {
      state.value = null
    },
  },
})

export const { userData, clearUser } = userSlice.actions
export default userSlice.reducer
