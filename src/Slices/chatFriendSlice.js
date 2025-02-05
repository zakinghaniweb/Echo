import { createSlice } from '@reduxjs/toolkit'

export const chatFriendSlice = createSlice({
  name: 'ChatUser',
  initialState: {
    value: JSON.parse(localStorage.getItem("chatFriend")) || null,
  },
  reducers: {
    setChatFriend: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setChatFriend } = chatFriendSlice.actions
export default chatFriendSlice.reducer
