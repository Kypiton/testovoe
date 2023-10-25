export interface IUser {
  username: string;
  password: string;
}

export interface IDataItem {
  id: number | null;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
}

export interface IDataList extends Array<IDataItem> {}

export interface IDataResponse {
  count?: number | null;
  next?: string;
  previous?: string;
  results?: any;
}

export interface ICol {
  id: number;
  name: string;
}
