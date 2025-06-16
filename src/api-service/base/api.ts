import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BaseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["EMPLOYEES", "APPRAISALS"],
  endpoints: () => ({}),
});

export default BaseApi;
