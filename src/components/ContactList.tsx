import React from 'react';
import { useDeleteContactMutation, useGetContactsQuery } from '../services/contacts';
import CreateContact from './CreateContact';

const ContactList: React.FC = () => {
  const { data, error, isLoading } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const handleDelete = async (contactId: string) => {
    try {
      await deleteContact(contactId).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className='container mx-auto p-4'>
      <CreateContact />
      <h1 className='text-2xl font-bold mb-4'>Contacts</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data?.resources.map((contact: any) => (
          <div key={contact.id} className='bg-white p-4 rounded shadow-md'>
            <img src={contact.avatar_url} alt='avatar' className='w-16 h-16 rounded-full mx-auto' />
            <h2 className='text-xl font-bold mt-4'>
              Name: {contact.fields?.['first name']?.[0]?.value}
              <br />
              Last name: {contact.fields?.['last name']?.[0]?.value}
            </h2>
            <p className='text-gray-600'>{contact.fields?.email?.[0]?.value}</p>
            <div className='mt-2'>
              {contact.tags?.map((tag: any) => (
                <span
                  key={tag.id}
                  className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'
                >
                  {tag.tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => handleDelete(contact.id)}
              className='mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
