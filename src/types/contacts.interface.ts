export type TCreateContact = { value: string, modifier: string, label: string }[];

export interface IContact {
	id?: string;
	avatar?: string;
	first_name?: string;
	last_name?: string;
	email?: string;
	tags?: string[];
}

export interface INewContact {
	'first name': TCreateContact;
	'last name': TCreateContact;
	email: TCreateContact;
}

export interface IAddTags {
	id: string;
	tags: string[];
}