import {configureStore} from '@reduxjs/toolkit';
import {contactsReducer} from '../store/contactsSlice';

export const store = configureStore({
  reducer: contactsReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;