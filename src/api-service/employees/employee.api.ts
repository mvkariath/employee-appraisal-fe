import type { Employee } from "./types";
import baseApi from "../api";

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "/employee",
      providesTags:['EMPLOYEES']
    }),
    getEmployeeById: builder.query<Employee,{id: number}> ({
      query: ({id}) => ({
        url: `/employee/${id}`
      })
    }),
    CreateEmployee: builder.mutation({
      query: (payload) => ({
        url:`/employee`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['EMPLOYEES']
    }),
    deleteEmployee: builder.mutation({
        query:({id}) => ({
            url: `/employee/${id}`,
            method: 'DELETE'
        }),
        invalidatesTags: ['EMPLOYEES']
    }),
    updateEmployee: builder.mutation({
      query: (payload) => ({
        url:`/employee/${payload.id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: ['EMPLOYEES']
    })
  }),
});

export const { useGetEmployeesQuery, useDeleteEmployeeMutation, useUpdateEmployeeMutation, useCreateEmployeeMutation, useGetEmployeeByIdQuery } = employeeApi;