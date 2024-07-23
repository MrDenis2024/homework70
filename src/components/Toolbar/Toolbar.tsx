import {NavLink} from 'react-router-dom';

const Toolbar = () => {
  return (
    <nav className='navbar navbar-dark bg-success'>
      <div className='container'>
        <NavLink to='/' className='navbar-brand'>Contacts</NavLink>
        <ul className='navbar-nav d-flex flex-row gap-3 flex-nowrap'>
          <li className='nav-item'>
            <NavLink to="/new-contact" className='nav-link'>Add new contact</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;