import axios, { AxiosResponse } from 'axios';
import { IUser, IDataItem, IDataResponse } from './interfaces';

const api = axios.create({
  baseURL: 'https://technical-task-api.icapgroupgmbh.com/api',
});

export const loginUser = async (userCredentials: IUser): Promise<AxiosResponse> => {
  return await api.post('/login/', userCredentials);
};

export const getTableData = async (offset: number): Promise<AxiosResponse<IDataResponse>> => {
  return await api.get(`/table/?offset=${offset}`);
};

export const updateTableData = async (
  id: number | null,
  newData: Partial<IDataItem>,
): Promise<AxiosResponse> => {
  return await api.put(`/table/${id}/`, newData);
};
