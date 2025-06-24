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
    
      providesTags:["APPRAISALS"]
      
    }),

    getAppraisalsByCycleId: builder.query({
      query: (cycleId) => `/appraisal/in-cycle/${cycleId}`,
          providesTags:["APPRAISALS"]
    }),

    getPastAppraisals: builder.query({
      query: (employeeId) => `/appraisal/past-appraisals/${employeeId}`,
          providesTags:["APPRAISALS"]
    }),
    getAppraisalByEmployeeId: builder.query<any[],number>({
      query: (employeeId) => `/appraisal/appraisal/employee/${employeeId}`,
          providesTags:["APPRAISALS"]
    }),

    createAppraisals: builder.mutation<Appraisal[], any>({
      query: (payload) => ({
        url: `/appraisal`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["APPRAISALS"],
    }),


    updateAppraisal: builder.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => ({
        url: `/appraisal/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["APPRAISALS"],
    }),
        updateAppraisalStatus: builder.mutation<any,{id:number,data:any}>({
      query: ({ id ,data}) => ({
        url: `/appraisal/status/${id}`,
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
  useUpdateAppraisalStatusMutation
} = appraisalApi;
