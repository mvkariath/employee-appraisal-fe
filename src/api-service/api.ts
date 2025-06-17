import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
	reducerPath: "baseApi",
	tagTypes: ['EMPLOYEES', 'EMPLOYEE_DETAILS', 'DEPARTMENTS'],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000",
		prepareHeaders: (headers) => {
			const stored = localStorage.getItem("token");

			if (stored) {
				try {
					const userDetails = JSON.parse(stored);
					if (userDetails?.token) {
						headers.set("Authorization", `Bearer ${userDetails.token}`);
					}
				} catch (error) {
					console.error("Failed to parse token from localStorage", error);
				}
			}

			return headers;
		},

	}),
	refetchOnMountOrArgChange: true,
	refetchOnReconnect: true,
	endpoints: () => ({}),
});

export default baseApi;
