import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Contact} from '../../types';
import ContactsPhoto from '../ContactsPhoto/ContactsPhoto';
import ButtonSpinner from '../Spinner/ButoonSpinner';

interface Props {
  onSubmit: (contact: Contact) => void;
  isLoading: boolean;
}

const emptyState: Contact = {
  name: '',
  phone: '',
  email: '',
  photo: '',
};

const ContactsForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact>(emptyState);

  const changeContact = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit(contact);
  };

  return (
    <form className='border rounded border-black my-4 p-3' onSubmit={onFormSubmit}>
      <h4>Add new contacts</h4>
      <div className='form-group mb-2'>
        <label htmlFor='name'>Name</label>
        <input type="text" name="name" id="name" className='form-control' onChange={changeContact} value={contact.name} required/>
      </div>
      <div className='form-group mb-2'>
        <label htmlFor='phone'>Phone</label>
        <input type="text" name='phone' id='phone' className='form-control' onChange={changeContact} value={contact.phone} required/>
      </div>
      <div className='form-group mb-2'>
        <label htmlFor='email'>Email</label>
        <input type="email" name="email" id="email" className='form-control' onChange={changeContact} value={contact.email} required/>
      </div>
      <div className='form-group'>
        <label htmlFor='photo'>Photo</label>
        <input type="text" name="photo" id="photo" className='form-control' onChange={changeContact} value={contact.photo} required />
      </div>
      <div className="form-group d-flex mt-3">
        <p className='me-3'>Photo preview:</p>
        <ContactsPhoto contact={contact} />
      </div>
      <div className="mt-2">
        <button type="submit" className="btn btn-primary me-3" disabled={isLoading}>{isLoading && <ButtonSpinner/>}Save</button>
        <button type="button" className="btn btn-success" onClick={() => navigate('/')} disabled={isLoading}>{isLoading && <ButtonSpinner/>} Back to contacts</button>
      </div>
    </form>
  );
};

export default ContactsForm;