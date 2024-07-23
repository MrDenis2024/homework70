import React, {useState} from 'react';
import {ContactMutation} from '../../types';
import ContactsPhoto from '../ContactsPhoto/ContactsPhoto';
import Modal from '../Modal/Modal';
import {useNavigate} from 'react-router-dom';

interface Props {
  contact: ContactMutation;
  onDelete: VoidFunction;
}

const ContactItem: React.FC<Props> = ({contact, onDelete}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <div className="card mb-2 w-50 contact-card" onClick={() => setShowModal(true)}>
        <div className="card-body d-flex align-items-center flex-wrap">
          <ContactsPhoto contact={contact}/>
          <h5 className="card-title ms-5 fs-1">{contact.name}</h5>
        </div>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className='modal-body d-flex align-items-center'>
          <ContactsPhoto contact={contact}/>
          <div className='ms-3'>
            <h2>{contact.name}</h2>
            <p className='mb-2'>Phone: <a className='text-decoration-none text-dark' href={`tel:${contact.phone}`}>{contact.phone}</a></p>
            <p className='mb-2'>Email: <a className='text-decoration-none text-dark' href={`mailto:${contact.email}`}>{contact.email}</a></p>
          </div>
        </div>
        <div className='modal-footer justify-content-center'>
          <button className='btn btn-success col-5' onClick={() => navigate(`/contact-edit/${contact.id}`)}>Edit</button>
          <button className='btn btn-danger col-5' onClick={onDelete}>Delete</button>
        </div>
      </Modal>
    </>
  );
};

export default ContactItem;