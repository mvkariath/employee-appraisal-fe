import { Appraisal, Employee } from "@/types";
import baseApi from "../api";

export const appraisalApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAppraisals: builder.query({
      query: () => "/appraisal",
      providesTags: ["APPRAISALS"],
    }),

    getAppraisalById: builder.query({
      query: (id) => `/appraisal/${id}`,
      
    }),

    getAppraisalsByCycleId: builder.query({
      query: (cycleId) => `/appraisal/in-cycle/${cycleId}`,
    }),

    getPastAppraisals: builder.query({
      query: (employeeId) => `/appraisal/past-appraisals/${employeeId}`,
    }),
    getAppraisalByEmployeeId: builder.query<any[],number>({
      query: (employeeId) => `/appraisal/appraisal/employee/${employeeId}`,
    }),

    createAppraisals: builder.mutation<Appraisal[], any>({
      query: (payload) => ({
        url: `/appraisal`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["APPRAISALS"],
    }),

    updateAppraisal: builder.mutation<any, { appraisalId: number; data: any }>({
      query: ({ appraisalId, data }) => ({
        url: `/appraisal/${appraisalId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["APPRAISALS"],
    }),

    deleteAppraisal: builder.mutation<any, number>({
      query: (id) => ({
        url: `/appraisal/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["APPRAISALS"],
    }),

    pushToLead: builder.mutation<any, number>({
      query: (id) => ({
        url: `/appraisal/push_to_lead/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["APPRAISALS"],
    }),
  }),
});

export const {
  useGetAppraisalsQuery,
  useGetAppraisalByIdQuery,
  useGetAppraisalsByCycleIdQuery,
  useGetPastAppraisalsQuery,
  useGetAppraisalByEmployeeIdQuery,
  useCreateAppraisalsMutation,
  useUpdateAppraisalMutation,
  useDeleteAppraisalMutation,
  usePushToLeadMutation,
} = appraisalApi;
