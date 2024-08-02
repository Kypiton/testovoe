import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetContactByIdQuery, useAddTagsToContactMutation } from '../services/contacts';

const ContactPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: contact, error, isLoading } = useGetContactByIdQuery(id!);
  const [addTags] = useAddTagsToContactMutation();
  const [newTags, setNewTags] = useState('');

  const handleAddTags = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = newTags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);

    if (tagsArray.length > 0) {
      try {
        const formattedTags = tagsArray.map(tag => ({
          id: tag,
          tag,
        }));

        console.log(`Adding tags to: ${id}`);
        console.log('Tags payload:', formattedTags);

        await addTags({ id: id!, tags: tagsArray }).unwrap();
        setNewTags('');
      } catch (err) {
        console.error('Failed to add tags:', err);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!contact || !contact.resources?.length) return <div>No contact found</div>;

  const contactData = contact.resources[0];
  const fields = contactData.fields || {};
  const firstNameField = fields['first name'] || [];
  const lastNameField = fields['last name'] || [];
  const emailField = fields['email'] || [];

  const firstName = firstNameField[0]?.value || '';
  const lastName = lastNameField[0]?.value || '';
  const email = emailField[0]?.value || '';
  const tags = contactData.tags || [];

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-6 shadow-md rounded-md w-full max-w-md'>
        <div className='flex flex-col items-center'>
          <img
            src={contactData.avatar_url}
            alt={`${firstName} ${lastName}`}
            className='w-32 h-32 rounded-full'
          />
          <h2 className='text-3xl font-bold mt-4'>
            {firstName} {lastName}
          </h2>
          <p className='text-lg mt-2'>{email}</p>
          <div className='text-lg mt-2'>{tags.map((tag: any) => tag.tag).join(', ')}</div>

          <form onSubmit={handleAddTags} className='mt-4 w-full max-w-sm'>
            <input
              type='text'
              value={newTags}
              onChange={e => setNewTags(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Add tags, separated by commas'
              required
            />
            <button
              type='submit'
              className='inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2'
            >
              Add Tags
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
