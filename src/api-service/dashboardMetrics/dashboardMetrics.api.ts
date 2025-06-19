import baseApi from "../api";

export const dashboardMetricsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMetrics: builder.query<any, void>({
      query: () => "/dashboard-metrics",
    })
  }),
});

export const {useGetMetricsQuery} = dashboardMetricsApi;