import './App.css';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import NewContacts from './containers/NewContacts/NewContacts';
import PhoneBook from './containers/PhoneBook/PhoneBook';
import EditContact from './containers/EditContact/EditContact';

const App = () => (
  <Layout>
    <Routes>
      <Route path='/' element={<PhoneBook />} />
      <Route path='/new-contact' element={<NewContacts />} />
      <Route path='/edit-contact/:id' element={<EditContact />} />
      <Route path='*' element={<div className="text-center mt-5"><strong>Данной страницы не найдено вернитесь
        пожалуйста обратно!</strong></div>} />
    </Routes>
  </Layout>
);

export default App;
