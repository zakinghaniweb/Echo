import { configureStore } from '@reduxjs/toolkit';
import userSlice from './Slices/userSlice';

export default configureStore({
  reducer: {
    User: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
