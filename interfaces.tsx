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

export interface ICol {
  id: number;
  name: string;
}
