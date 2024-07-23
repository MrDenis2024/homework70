import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectContacts, selectDeleteLoading, selectFetchContactsLoading} from '../../store/contactsSlice';
import {deleteContact, fetchContacts} from '../../store/contactsThunk';
import Spinner from '../Spinner/Spinner';
import ContactItem from './ContactItem';
import {toast} from 'react-toastify';

const Contacts = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const contactsLoading = useAppSelector(selectFetchContactsLoading);
  const deleteLoading = useAppSelector(selectDeleteLoading);

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
      toast.error('Произошла ошибка по удалению контакта');
    }
  };

  return (
    <div className='mt-5 mb-3'>
      {contacts.length === 0 && !contactsLoading && <h2>Контакты пока не добавленны</h2>}
      <>
        {contactsLoading ? (<div className='text-center'><Spinner /></div>
        ) : (
          <>
            {contacts.map((contact) => (
              <div key={contact.id}>
                <ContactItem contact={contact} onDelete={() => removeContact(contact.id)} deleteLoading={deleteLoading}/>
              </div>
            ))}
          </>
        )}
      </>
    </div>
  );
};

export default Contacts;