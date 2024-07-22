import {createSlice} from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {},
  reducers: {},
});

export const contactsReducer = contactsSlice.reducer;