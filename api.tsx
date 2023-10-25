import axios, { AxiosResponse } from 'axios';
import { IUser, IDataItem } from './interfaces';

const api = axios.create({
  baseURL: 'https://technical-task-api.icapgroupgmbh.com/api',
});

export const loginUser = async (userCredentials: IUser): Promise<AxiosResponse> => {
  const loginUrl = '/login/';
  return await api.post(loginUrl, userCredentials);
};

export const getTableData = async (offset: number): Promise<AxiosResponse<IDataItem[]>> => {
  const tableUrl = `/table/?offset=${offset}`;
  return await api.get(tableUrl);
};

export const updateTableData = async (
  id: number | null,
  newData: Partial<IDataItem>,
): Promise<AxiosResponse> => {
  const updateUrl = `/table/${id}/`;
  return await api.put(updateUrl, newData);
};
