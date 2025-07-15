// import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import getBaseURL from '../../../utils/baseURL';


// const baseQuery =fetchBaseQuery({
//     baseUrl: `${getBaseURL()}/api/books`,
//     Credentials: 'include',
//     prepareHeaders: (headers) => {
//         const token = localStorage.getItem('token'); // this is the token that we get from the backend server and we set it in the header for authentication on the backend server
//         // we get the token from the local storage and set it in the header for authentication on
//         if (token) {
//             headers.set('Authorization', `Bearer ${token}`);// this is the token that we get from the backend server   and we set it in the header for authentication on the backend server
//             // first we get toekn from backend server and then we set it in the header
//             // this is the token that we get from the backend server   and we set it in
//             //this authentication is used to verify the user is authenticated or not
//         }
//         return headers;
//     },
// });

// // in get we use query and in post, put, delete we use mutation
// // query is used to fetch data from the server and mutation is used to send data to the

// const booksApi = createApi({
//     reducerPath: 'booksApi',
//     baseQuery,
//     tagTypes:['Books'],
//     endpoints: (builder) => ({
//         fetchAllBooks: builder.query({
//             query: () => '/',
//             providesTags: ['Book'], // this is used to invalidate the cache when we add, edit or delete a book how? 
//         }),
//         fetchBookById: builder.query({
//             query: (id) => `/${id}`,
//             providesTags: (results,error,id)=>[{type:'Books',id}], // this is used to invalidate the cache when we add, edit or delete a book how? 
//         }),
//         addBook: builder.mutation({
//             query: (newBook) => ({
//                 url: `/create-book`,// is this wirt=itten in backtick? tell me why?ok
//                 method: 'POST',
//                 body: newBook,
//             }),
//             invalidatesTags: ['Books'], // this is used to invalidate the cache when we add, edit or delete a book how? 
//             // so that books list is updated after adding a new book 
//         }),
//         updateBook: builder.mutation({
//             query: ({id, ...updatedBook}) => ({
//                 url: `/edit/${id}`, // is this written in backtick? tell me why?ok
//                 // we use backtick here because we are using template literal to pass the id dynamically
//                 method: 'PUT',
//                 body: updatedBook,
//                 headers: {
//                     'Content-Type': 'application/json', // this is used to set the content type of the request 
//                 }
//             }),
//             invalidatesTags:['Books'], // this is used to invalidate the cache when we add, edit or delete a book how? 
//         }),

//         deleteBook: builder.mutation({
//             query: (id) => ({
//                 url: `/${id}`, // is this written in backtick? tell me why?ok
//                 method: 'DELETE',
//             }),
//             invalidatesTags:['Books'], // this is used to invalidate the cache when we add, edit or delete a book how? 
//         }),

//     })
// })

// export const {useFetchAllBooksQuery,useFetchBookByIdQuery,useAddBookMutation,useDeleteBookMutation}=booksApi;
// export default booksApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const  baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token =  localStorage.getItem('token');
        if(token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) =>({
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Books"]
        }),
        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Books", id }],
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
            query: ({id, ...rest}) => ({
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

export const {useFetchAllBooksQuery, useFetchBookByIdQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation} = booksApi;
export default booksApi;