import React, { useEffect, useState } from 'react';
import { IDataItem, ICol, IDataResponse, IDataList } from '@/interfaces';
import { colName } from '@/mock/data';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AxiosResponse } from 'axios';
import { getTableData, updateTableData } from '@/api';
import { RootState } from '@/store/store';

const TablePage: React.FC = () => {
  const [data, setData] = useState<IDataList>([]);
  const storeData = useSelector((state: RootState) => state.credentials);
  console.log(storeData);

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const formatBirthdayDate = (date: string): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [editedData, setEditedData] = useState<IDataItem>({
    id: null,
    name: '',
    email: '',
    birthday_date: formatBirthdayDate('MM/DD/YYYY'),
    phone_number: '',
  });

  const fetchData = async () => {
    try {
      const { data }: AxiosResponse<IDataResponse> = await getTableData(offset);

      const results = data.results;

      if (results) {
        setData(results);
      }
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
      const updatedData: Partial<IDataItem> = {
        name: editedData.name,
        email: editedData.email,
        birthday_date: editedData.birthday_date,
        phone_number: editedData.phone_number,
      };

      await updateTableData(editedData.id, updatedData);
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
    const { password, username } = storeData;

    if (!password && !username) router.push('/');
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
                {colName.map((item: ICol) => (
                  <th key={item.id} scope='col' className='px-6 py-3'>
                    {item.name}
                  </th>
                ))}
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
                        setEditedData({
                          ...editedData,
                          birthday_date: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={
                        editedData.id === item.id ? editedData.phone_number : item.phone_number
                      }
                      onChange={e =>
                        setEditedData({
                          ...editedData,
                          phone_number: e.target.value,
                        })
                      }
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
