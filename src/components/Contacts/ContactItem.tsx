import React, {useEffect} from 'react';
import ContactsPhoto from '../ContactsPhoto/ContactsPhoto';
import {fetchContacts} from '../../store/contactsThunk';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectContacts} from '../../store/contactsSlice';

const ContactItem: React.FC = () => {
  const contacts = useAppSelector(selectContacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {contacts.map(contact => (
        <div key={contact.id} className="card mb-2 w-50">
          <div className="card-body d-flex align-items-center flex-wrap">
            <ContactsPhoto photo={contact.photo}/>
            <h5 className="card-title ms-5 fs-1">{contact.name}</h5>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactItem;