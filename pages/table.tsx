import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface IDataItem {
  id: number | null;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
}

const TablePage: React.FC = () => {
  const [data, setData] = useState<IDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const formatBirthdayDate = (date: string): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const api = axios.create({
    baseURL: 'https://technical-task-api.icapgroupgmbh.com/api',
  });

  const [editedData, setEditedData] = useState<IDataItem>({
    id: null,
    name: '',
    email: '',
    birthday_date: formatBirthdayDate('MM/DD/YYYY'),
    phone_number: '',
  });

  const fetchData = async () => {
    try {
      const response = await api.get(`/table/?offset=${offset}`);
      setData(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(offset - 10);
    }
  };

  const handleNextPage = () => {
    if (offset < 80) {
      setOffset(offset + 10);
    }
  };

  const handleEdit = (item: any) => {
    setEditedData(item);
  };

  const handleSave = async () => {
    try {
      const updateUrl = `/table/${editedData.id}/`;

      await api.put(updateUrl, editedData);
      setEditedData({
        id: null,
        name: '',
        email: '',
        birthday_date: '',
        phone_number: '',
      });
      fetchData();
    } catch (error) {
      console.error('Помилка збереження даних:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

  return (
    <div>
      <h1 className='text-center'>Table</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='relative overflow-x-auto'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Email
                </th>
                <th scope='col' className='px-6 py-3'>
                  Date
                </th>
                <th scope='col' className='px-6 py-3'>
                  Phone
                </th>
                <th scope='col' className='px-6 py-3'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: IDataItem) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type='text'
                      value={editedData.id === item.id ? editedData.name : item.name}
                      onChange={e => setEditedData({ ...editedData, name: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={editedData.id === item.id ? editedData.email : item.email}
                      onChange={e => setEditedData({ ...editedData, email: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={
                        editedData.id === item.id ? editedData.birthday_date : item.birthday_date
                      }
                      onChange={e =>
                        setEditedData({ ...editedData, birthday_date: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={
                        editedData.id === item.id ? editedData.phone_number : item.phone_number
                      }
                      onChange={e => setEditedData({ ...editedData, phone_number: e.target.value })}
                    />
                  </td>
                  <td>
                    {editedData.id === item.id ? (
                      <button onClick={handleSave}>Save</button>
                    ) : (
                      <button onClick={() => handleEdit(item)}>Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-center items-center gap-10 mt-5'>
            <button onClick={handlePreviousPage}>&larr;</button>
            <button onClick={handleNextPage}>&rarr;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablePage;
