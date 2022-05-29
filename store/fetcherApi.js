import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fetcherApi = createApi({
  reducerPath: "fetcherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  tagTypes: ["newUser"],
  endpoints(build) {
    return {
      allUser: build.query({
        query: () => ({ url: "users" }),
        providesTags: ["newUser"],
      }),
      postUser: build.mutation({
        query: (body) => ({
          url: "users",
          method: "post",
          body,
        }),
        invalidatesTags: ["newUser"],
      }),
    };
  },
});

export const { useAllUserQuery, usePostUserMutation } = fetcherApi;
