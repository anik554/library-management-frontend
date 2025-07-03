import type { BooksApiResponse } from "@/interfaces/book/book-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetBooksParams {
  filter?: string;
  sortBy?: string;
  limit?: number;
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getBooks: builder.query<BooksApiResponse, GetBooksParams | void>({
      query: (params) => {
        if (!params) return { url: "/books/" };

        const queryParams: Record<string, string> = {};
        if (params.filter) queryParams.filter = params.filter;
        if (params.sortBy) queryParams.sortBy = params.sortBy;
        if (params.limit !== undefined)
          queryParams.limit = String(params.limit);

        return {
          url: "/books/",
          params: queryParams,
        };
      },
    }),
    createBook: builder.mutation({
      query: (bookData) => ({
        url: `/books/`,
        method: "POST",
        body: bookData,
      }),
    }),
    updatebook: builder.mutation({
      query: ({ id, ...bookData }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: bookData,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id:string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetBooksQuery, useUpdatebookMutation, useDeleteBookMutation, useCreateBookMutation } = baseApi;
