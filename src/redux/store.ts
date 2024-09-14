import { configureStore } from '@reduxjs/toolkit';
import communityReducer from './communitySlice';


export const store = configureStore({
    reducer: {
      community: communityReducer,
    },
  });

  export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;