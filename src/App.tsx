import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactList from './components/ContactList';
import ContactPage from './components/ContactPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ContactList />} />
        <Route path='/contact/:id' element={<ContactPage />} />
      </Routes>
    </Router>
  );
};

export default App;
