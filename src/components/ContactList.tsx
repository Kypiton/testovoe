import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetContactsQuery, useDeleteContactMutation } from '../services/contacts';
import CreateContact from './CreateContact';
import './ContactList.css';

const ContactList: React.FC = () => {
  const { data, error, isLoading } = useGetContactsQuery(undefined);
  const [deleteContact] = useDeleteContactMutation();
  const navigate = useNavigate();

  const handleDeleteContact = async (id: string) => {
    try {
      await deleteContact(id).unwrap();
    } catch (err) {
      console.error('Failed to delete contact:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className='mx-auto p-4 flex flex-col md:flex-row gap-4 min-w-[400px] max-w-[1280px]'>
      <div className='w-full md:w-1/3 md:sticky md:top-0'>
        <CreateContact />
      </div>
      <div className='w-full md:w-2/3'>
        <h1 className='text-2xl font-bold mb-4'>Contacts</h1>
        <div className='grid grid-cols-1 gap-4'>
          {data?.resources?.map((contact: any) => {
            const firstName = contact.fields?.['first name']?.[0]?.value || 'Unknown';
            const lastName = contact.fields?.['last name']?.[0]?.value || 'Unknown';
            const email = contact.fields?.['email']?.[0]?.value || 'No Email';
            const avatarUrl = contact.avatar_url || 'default-avatar.png';
            const tags = contact.tags?.map((tag: any) => tag.tag).join(', ') || 'No Tags';

            return (
              <div
                key={contact.id}
                className='p-4 border rounded shadow hover:bg-gray-100 cursor-pointer w-full'
              >
                <div onClick={() => navigate(`/contact/${contact.id}`)}>
                  <img
                    src={avatarUrl}
                    alt={`${firstName} ${lastName}`}
                    className='w-16 h-16 rounded-full mx-auto'
                  />
                  <h3 className='text-xl text-center mt-2'>
                    {firstName} {lastName}
                  </h3>
                  <p className='text-center'>{email}</p>
                  <div className='text-center'>{tags}</div>
                </div>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className='mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                >
                  Delete Contact
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactList;
