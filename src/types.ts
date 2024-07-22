export interface Contact {
  name: string;
  phone: string;
  email: string;
  photo: string;
}

export interface ContactMutation extends Contact {
  id: string;
}

export interface ApiContacts {
  [id: string]: Contact;
}