import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {fetchOneContact, updateContact} from '../../store/contactsThunk';
import {
  selectFetchOneLoading,
  selectOneContact,
  selectUpdateLoading
} from '../../store/contactsSlice';
import ContactsForm from '../../components/ContactsForm/ContactsForm';
import Spinner from '../../components/Spinner/Spinner';
import {Contact} from '../../types';
import {toast} from 'react-toastify';

const EditContact = () => {
  const {id} = useParams() as {id: string};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectFetchOneLoading);
  const isUpdating = useAppSelector(selectUpdateLoading);
  const contact = useAppSelector(selectOneContact);

  const onSubmit = async (contact: Contact) => {
    try {
      await dispatch(updateContact({id, contact})).unwrap();
      navigate('/');
      toast.success('Контакт успешно обновлён');
    } catch (e) {
      toast.error('Произошла ошибка обновления контакта');
    }
  };

  useEffect(() => {
    dispatch(fetchOneContact(id));
  }, [dispatch, id]);

  return (
    <div>
      {isFetching && <div className='text-center'><Spinner/></div>}
      {contact && (
        <ContactsForm onSubmit={onSubmit} existingContact={contact} isLoading={isUpdating} />
      )}
    </div>
  );
};

export default EditContact;