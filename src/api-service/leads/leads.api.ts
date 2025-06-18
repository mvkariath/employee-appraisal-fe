
import baseApi from "../api";
import { AppraisalLeadView, EmployeeData } from "./types";

export const leadsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeads: builder.query<EmployeeData[],void>({
      query: () => `/self-appraisal/get-appraisals-of-lead/`,
      providesTags:['LEADS']
    }),
    getAppraisalById: builder.query<AppraisalLeadView,{id: number}> ({
      query: ({id}) => ({
        url: `/appraisal/${id}`
      })
    }),

    // CreateEmployee: builder.mutation({
    //   query: (payload) => ({
    //     url:`/employee`,
    //     method: 'POST',
    //     body: payload
    //   }),
    //   invalidatesTags: ['EMPLOYEES']
    // }),
    // deleteEmployee: builder.mutation({
    //     query:({id}) => ({
    //         url: `/employee/${id}`,
    //         method: 'DELETE'
    //     }),
    //     invalidatesTags: ['EMPLOYEES']
    // }),
   updatePerformanceFactor: builder.mutation({
  query: ({ id, ...body }) => ({
    url: `/appraisal/${id}`,
    method: 'PUT',
    body:body, // contains everything except id
  }),
  invalidatesTags: ['LEADS'],
}),
  }),
});

export const { useGetAppraisalByIdQuery,useGetLeadsQuery ,useUpdatePerformanceFactorMutation} = leadsApi;