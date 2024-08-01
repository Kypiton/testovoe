import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactList from './components/ContactList';
import ContactPage from './components/ContactPage';
import CreateContact from './components/CreateContact';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ContactList />} />
        <Route path='/contact/:id' element={<ContactPage />} />
        <Route path='/create-contact' element={<CreateContact />} />
      </Routes>
    </Router>
  );
};

export default App;
