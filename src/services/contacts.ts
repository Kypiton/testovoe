import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IAddTags, IContact, INewContact } from '../types/contacts.interface';

const apiKey = 'VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn';

export const tagTypes = ['Contacts'] as const;

export const contactsApi = createApi({
	reducerPath: 'contactsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/v1',
		prepareHeaders: (headers) => {
			headers.set('Authorization', `Bearer ${apiKey}`);
			headers.set('Cache-Control', 'no-cache');
			return headers;
		},
	}),
	tagTypes,
	endpoints: (builder) => ({
		getContacts: builder.query<any, void>({
			query: () => ({
				url: '/contacts',
				params: { sort: 'created:desc' },
			}),
			providesTags: ['Contacts'],
		}),
		getContactById: builder.query<IContact, string>({
			query: (id) => `contact/${id}`,
		}),
		createContact: builder.mutation<any, any>({
			query: (newContact) => ({
				url: 'contact',
				method: 'POST',
				body: newContact,
			}),
			invalidatesTags: ['Contacts'],
		}),
		deleteContact: builder.mutation<{ success: boolean }, string>({
			query: (id) => ({
				url: `contact/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Contacts']
		}),
		addTagsToContact: builder.mutation<void, IAddTags>({
			query: ({ id, tags }) => ({
				url: `contact/${id}/tags`,
				method: 'PUT',
				body: { tags },
			}),
		}),
	}),
});

export const {
	useGetContactsQuery,
	useGetContactByIdQuery,
	useCreateContactMutation,
	useDeleteContactMutation,
	useAddTagsToContactMutation,
} = contactsApi;
