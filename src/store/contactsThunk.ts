import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {ApiContacts, Contact, ContactMutation} from '../types';
import {RootState} from '../app/store';
import axios from 'axios';

export const createContact = createAsyncThunk<void, Contact, {state: RootState}>('contacts/createContact', async (contact) => {
  await axiosApi.post('/phoneBook.json', contact);
});

export const fetchContacts = createAsyncThunk<ContactMutation[], void, {state: RootState}>('contacts/fetchContacts', async () => {
  const contactsResponse = await axiosApi.get<ApiContacts | null>('/phoneBook.json');
  const contacts = contactsResponse.data;

  if(contacts === null) {
    return [];
  }

  const newContacts: ContactMutation[] = Object.keys(contacts).reverse().map((id: string) => {
    return {
      ...contacts[id],
      id,
    };
  });

  return newContacts;
});

export const fetchImg = createAsyncThunk<string | null, string, { state: RootState }>('contacts/fetchImg',async (url) => {
  const { headers: imgResponse } = await axios.head(url);
  if (imgResponse['content-type'].startsWith('image/')) {
    return url;
  }
  return null;
});