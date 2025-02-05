import { configureStore } from '@reduxjs/toolkit';
import userSlice from './Slices/userSlice';
import chatFriendSlice from './Slices/chatFriendSlice';

export default configureStore({
  reducer: {
    User: userSlice,
    currentFriend: chatFriendSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
