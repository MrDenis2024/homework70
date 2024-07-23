import {createSlice} from '@reduxjs/toolkit';
import {createContact, deleteContact, fetchContacts, fetchOneContact, updateContact} from './contactsThunk';
import {Contact, ContactMutation} from '../types';

export interface ContactsState {
  createLoading: boolean;
  fetchLoading: boolean;
  deleteLoading: boolean;
  fetchOneLoading: boolean;
  updateLoading: boolean;
  contacts: ContactMutation[];
  oneContact: Contact | null;
}

const initialState: ContactsState = {
  createLoading: false,
  fetchLoading: false,
  deleteLoading: false,
  fetchOneLoading: false,
  updateLoading: false,
  contacts: [],
  oneContact: null,
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

    builder.addCase(deleteContact.pending, (state) => {
      state.deleteLoading = true;
    }).addCase(deleteContact.fulfilled, (state) => {
      state.deleteLoading = false;
    }). addCase(deleteContact.rejected, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(fetchOneContact.pending, (state) => {
      state.oneContact = null;
      state.fetchOneLoading = true;
    }).addCase(fetchOneContact.fulfilled, (state, {payload: contact}) => {
      state.oneContact = contact;
      state.fetchOneLoading = false;
    }).addCase(fetchOneContact.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(updateContact.pending, (state) => {
      state.updateLoading = true;
    }).addCase(updateContact.fulfilled, (state) => {
      state.updateLoading = false;
    }).addCase(updateContact.rejected, (state) => {
      state.updateLoading = false;
    });
  },
  selectors: {
    selectCreateContactLoading: (state) => state.createLoading,
    selectFetchContactsLoading: (state) => state.fetchLoading,
    selectContacts: (state) => state.contacts,
    selectDeleteLoading: (state) => state.deleteLoading,
    selectFetchOneLoading: (state) => state.fetchOneLoading,
    selectOneContact: (state) => state.oneContact,
    selectUpdateLoading: (state) => state.updateLoading,
  },
});

export const contactsReducer = contactsSlice.reducer;
export const {
  selectCreateContactLoading,
  selectFetchContactsLoading,
  selectContacts,
  selectDeleteLoading,
  selectFetchOneLoading,
  selectOneContact,
  selectUpdateLoading,
} = contactsSlice.selectors;