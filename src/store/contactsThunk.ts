import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';
import {ApiContacts, Contact, ContactMutation} from '../types';
import {RootState} from '../app/store';

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

export const deleteContact = createAsyncThunk<void, string, {state: RootState}>('contacts/deleteContact',async (contactId) => {
  await axiosApi.delete(`phoneBook/${contactId}.json`);
});

export const fetchOneContact = createAsyncThunk<Contact, string, {state: RootState}>('contacts/fetchOneContact', async (id) => {
  const {data: contact} = await axiosApi.get<Contact | null>(`/phoneBook/${id}.json`);

  if(contact === null) {
    throw new Error('Not found');
  }

  return contact;
});

export interface UpdateContactArg {
  id: string,
  contact: Contact,
}

export const updateContact = createAsyncThunk<void, UpdateContactArg, {state: RootState}>('contacts/updateContact',async ({id, contact}) => {
  await axiosApi.put(`/phoneBook/${id}.json`, contact);
});