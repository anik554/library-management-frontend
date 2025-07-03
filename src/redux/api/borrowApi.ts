import type { BooksApiResponse } from "@/interfaces/book/book-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetBooksParams {
  filter?: string;
  sortBy?: string;
  limit?: number;
}

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    // getBooks: builder.query<BooksApiResponse, GetBooksParams | void>({
    //   query: (params) => {
    //     if (!params) return { url: "/books/" };

    //     const queryParams: Record<string, string> = {};
    //     if (params.filter) queryParams.filter = params.filter;
    //     if (params.sortBy) queryParams.sortBy = params.sortBy;
    //     if (params.limit !== undefined)
    //       queryParams.limit = String(params.limit);

    //     return {
    //       url: "/books/",
    //       params: queryParams,
    //     };
    //   },
    // }),
    borrowBook: builder.mutation({
      query: (borrowData) => ({
        url: `/borrow/`,
        method: "POST",
        body: borrowData,
      }),
    }),
  }),
});

export const { useBorrowBookMutation } = borrowApi;