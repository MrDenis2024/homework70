import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {Contact} from '../types';
import {RootState} from '../app/store';

export const createContact = createAsyncThunk<void, Contact, {state: RootState}>('contacts/create', async (contact) => {
  await axiosApi.post('/phoneBook.json', contact);
});