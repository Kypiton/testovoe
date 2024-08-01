import React, { useState } from 'react';
import { useCreateContactMutation } from '../services/contacts';

const CreateContact: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [createContact] = useCreateContactMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName && !lastName) {
      alert('Either first name or last name is required');
      return;
    }

    if (!email || !validateEmail(email)) {
      alert('Invalid email address');
      return;
    }

    try {
      await createContact({
        record_type: 'person',
        privacy: {
          edit: null,
          read: null,
        },
        owner_id: null,
        fields: {
          'first name': [{ value: firstName, modifier: '', label: 'first name' }],
          'last name': [{ value: lastName, modifier: '', label: 'last name' }],
          email: [{ value: email, modifier: '', label: 'email' }],
        },
      }).unwrap();
      // Clear the form
      setFirstName('');
      setLastName('');
      setEmail('');
    } catch (err) {
      console.error('Failed to create contact:', err);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className='sticky top-0 bg-white p-4 shadow-md rounded-md'>
      <h2 className='text-2xl font-bold mb-6'>Create New Contact</h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label htmlFor='firstName' className='block text-sm font-medium text-gray-700'>
            First Name
          </label>
          <input
            id='firstName'
            type='text'
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          />
        </div>
        <div>
          <label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>
            Last Name
          </label>
          <input
            id='lastName'
            type='text'
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          />
        </div>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
          />
        </div>
        <button
          type='submit'
          className='inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Create Contact
        </button>
      </form>
    </div>
  );
};

export default CreateContact;
