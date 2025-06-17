import type { AppraisalCycle } from "./types";
import baseApi from "../api";

export const appraisalCycleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCycles: builder.query<AppraisalCycle[], void>({
      query: () => "/appraisal-cycle",
      providesTags:['CYCLES']
    }),
    getCycleById: builder.query<AppraisalCycle,{id: number}> ({
      query: ({id}) => ({
        url: `/appraisal-cycle/${id}`
      })
    }),
    createCycle: builder.mutation({
      query: (payload) => ({
        url:`/appraisal-cycle`,
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['CYCLES']
    }),
    deleteCycle: builder.mutation({
        query:({id}) => ({
            url: `/appraisal-cycle/${id}`,
            method: 'DELETE'
        }),
        invalidatesTags: ['CYCLES']
    }),
    updateCycle: builder.mutation({
      query: (payload) => ({
        url:`/appraisal-cycle/${payload.id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: ['CYCLES']
    })
  }),
});

export const {useCreateCycleMutation,useDeleteCycleMutation,useGetCycleByIdQuery,useGetCyclesQuery,useUpdateCycleMutation} = appraisalCycleApi;