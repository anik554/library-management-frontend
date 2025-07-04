import type { IBorrow } from "@/interfaces/borrow/borrow-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getBorrowSummary: builder.query<IBorrow,number>({
      query: (pageLimit) => ({
        url: `/borrow?pageLimit=${pageLimit}`,
        method: "GET",
      }),
    }),
    borrowBook: builder.mutation({
      query: (borrowData) => ({
        url: `/borrow/`,
        method: "POST",
        body: borrowData,
      }),
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
