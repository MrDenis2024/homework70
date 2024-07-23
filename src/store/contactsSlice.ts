import {createSlice} from '@reduxjs/toolkit';
import {createContact, fetchContacts, fetchImg} from './contactsThunk';
import {ContactMutation} from '../types';

export interface ContactsState {
  createLoading: boolean;
  fetchLoading: boolean;
  imgStatus: string | null;
  contacts: ContactMutation[];
}

const initialState: ContactsState = {
  createLoading: false,
  fetchLoading: false,
  imgStatus: null,
  contacts: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createContact.pending, (state) => {
      state.createLoading = true;
    }).addCase(createContact.fulfilled, (state) => {
      state.createLoading = false;
    }).addCase(createContact.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(fetchContacts.pending, (state) => {
      state.fetchLoading = true;
    }).addCase(fetchContacts.fulfilled, (state, {payload: contactsList}) => {
      state.fetchLoading = false;
      state.contacts = contactsList;
    }).addCase(fetchContacts.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchImg.pending, (state) => {
      state.imgStatus = null;
    }).addCase(fetchImg.fulfilled, (state, {payload: status}) => {
      state.imgStatus = status;
    }).addCase(fetchImg.rejected, (state) => {
      state.imgStatus = null;
    });

  },
  selectors: {
    selectCreateContactLoading: (state) => state.createLoading,
    selectFetchContactsLoading: (state) => state.fetchLoading,
    selectContacts: (state) => state.contacts,
    selectImgStatus: (state) => state.imgStatus,
  },
});

export const contactsReducer = contactsSlice.reducer;
export const {selectCreateContactLoading, selectFetchContactsLoading, selectContacts, selectImgStatus,} = contactsSlice.selectors;