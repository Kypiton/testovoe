import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = 'VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn';

export const tagTypes = ['Contacts'] as const;

export const contactsApi = createApi({
	reducerPath: 'contactsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/v1',
		prepareHeaders: (headers) => {
			headers.set('Authorization', `Bearer ${apiKey}`);
			headers.set('Cache-Control', 'no-cache');
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	tagTypes,
	endpoints: (builder) => ({
		getContacts: builder.query<any, any>({
			query: () => ({
				url: '/contacts',
				params: { sort: 'created:desc' },
			}),
			providesTags: ['Contacts'],
		}),
		getContactById: builder.query<any, any>({
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
		deleteContact: builder.mutation<{ success: boolean }, any>({
			query: (id) => ({
				url: `contact/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Contacts']
		}),
		addTagsToContact: builder.mutation<void, { id: string; tags: { id: string; tag: string }[] }>({
			query: ({ id, tags }) => ({
				url: `contacts/${id}/tags`,
				method: 'PUT',
				body: {
					tags,
					contact_id: id
				},
			}),
			invalidatesTags: ['Contacts']
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
