import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userListReducer from './features/userSlice/userSlice';

export const store = configureStore({
  reducer: {
    users: userListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
