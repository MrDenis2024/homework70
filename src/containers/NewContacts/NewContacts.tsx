import ContactsForm from '../../components/ContactsForm/ContactsForm';
import {Contact} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCreateContactLoading} from '../../store/contactsSlice';
import {createContact} from '../../store/contactsThunk';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const NewContacts = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCreateContactLoading);

  const onSubmit = async (contact: Contact) => {
    try {
      await dispatch(createContact(contact)).unwrap();
      navigate('/');
      toast.success('Контакт успешно создан!');
    } catch (e) {
      toast.error('Произошла ошибка созадние контакта');
    }
  };

  return (
    <div>
      <ContactsForm onSubmit={onSubmit} isLoading={isCreating}/>
    </div>
  );
};

export default NewContacts;