import React from 'react';
import {toast} from 'react-toastify';

interface Props {
  photo: string;
  name: string;
}

const placeholderPhoto = 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg';

const ContactsPhoto: React.FC<Props> = ({photo, name}) => {
  const isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = placeholderPhoto;
    toast.error('Неправельная ссылка');
  };

  return (
    <>
      <img className='img' src={isValidURL(photo) ? photo : placeholderPhoto} onError={handleError} alt={name} />
    </>
  );
};

export default ContactsPhoto;