import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: async (headers, { getState }) => {
        try {
            // Get token from localStorage
            const token = localStorage.getItem('token');

            if (token) {
                // Set the authorization header with proper casing
                headers.set('Authorization', `Bearer ${token}`);
            }

            // Set content type
            headers.set('Content-Type', 'application/json');

            return headers;
        } catch (error) {
            console.error('Error preparing headers:', error);
            return headers;
        }
    }
})

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({

        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Books"]
        }),

        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Books", id }],
        }),

        searchBooks: builder.query({
            query: (searchQuery) => `/search?query=${encodeURIComponent(searchQuery)}`,
            providesTags: ["Books"]
        }),

        fetchRecommendedBooks: builder.query({
            query: (limit = 10) => `/recommended?limit=${limit}`,
            providesTags: ["Books"]
        }),

        addBook: builder.mutation({
            query: (newBook) => ({
                url: `/create-book`,
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Books"]
        }),

        updateBook: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Books"]
        }),

        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Books"]
        })
    })
})

export const { useFetchAllBooksQuery,
    useFetchBookByIdQuery,
    useSearchBooksQuery,
    useFetchRecommendedBooksQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation
} = booksApi;
export default booksApi;
