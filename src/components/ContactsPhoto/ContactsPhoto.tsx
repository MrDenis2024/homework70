import React, {useCallback, useEffect} from 'react';
import {toast} from 'react-toastify';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchImg} from '../../store/contactsThunk';
import {selectImgStatus} from '../../store/contactsSlice';
import {Contact, ContactMutation} from '../../types';

interface Props {
  contact: Contact | ContactMutation;
}

const placeholderPhoto = 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg';

const ContactsPhoto: React.FC<Props> = ({contact}) => {
  const dispatch = useAppDispatch();
  const imgStatus = useAppSelector(selectImgStatus);

  const validImg = useCallback ( async (url: string) => {
    try {
      await dispatch(fetchImg(url)).unwrap();
    } catch (e) {
      toast.error('Could not load contacts photo');
    }
  }, [dispatch]);

  useEffect(() => {
    void validImg(contact.photo);
  }, [validImg, contact.photo]);

  return (
    <>
      {imgStatus ? (
        <img className='img' src={contact.photo} alt={contact.name} />
      ) : (
        <img className='img' src={placeholderPhoto} alt='placeholder' />
      )}
    </>
  );
};

export default ContactsPhoto;