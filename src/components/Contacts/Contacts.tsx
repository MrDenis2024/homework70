import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectContacts, selectFetchContactsLoading} from '../../store/contactsSlice';
import {deleteContact, fetchContacts} from '../../store/contactsThunk';
import Spinner from '../Spinner/Spinner';
import ContactItem from './ContactItem';
import {toast} from 'react-toastify';

const Contacts = () => {
  const contacts = useAppSelector(selectContacts);
  const dispatch = useAppDispatch();
  const contactsLoading = useAppSelector(selectFetchContactsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const removeContact = async (contactId: string) => {
    try {
      if(window.confirm('Вы точно хотите удалить данный контакт?')) {
        await dispatch(deleteContact(contactId)).unwrap();
        await dispatch(fetchContacts());
        toast.success('Контакт успешно удалён');
      }
    } catch (e) {
      toast.error('Произошла ошибка по удалению фото');
    }
  };


  return (
    <div className='mt-5'>
      {contactsLoading ? (<Spinner />
      ) : (
        <>
          {contacts.map((contact) => (
            <div key={contact.id}>
              <ContactItem contact={contact} onDelete={() => removeContact(contact.id)}/>
            </div>
          ))}
        </>
        )}
    </div>
  );
};

export default Contacts;