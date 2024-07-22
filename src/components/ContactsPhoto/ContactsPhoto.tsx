import React from 'react';
import {Contact} from '../../types';

interface Props {
  contact: Contact;
}

const placeholderPhoto = 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg';

const ContactsPhoto: React.FC<Props> = ({contact}) => {
  const isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <img className='img' src={isValidURL(contact.photo) ? contact.photo : placeholderPhoto}
         alt={isValidURL(contact.photo) ? contact.name : 'placeholder'}/>
  );
};

export default ContactsPhoto;