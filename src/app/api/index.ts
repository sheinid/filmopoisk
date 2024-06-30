import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export const baseQueryWithAuth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError,
	Record<string, unknown>,
	FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
	const token = localStorage.getItem("token");
	const baseQuery = fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_URL,
		prepareHeaders: (headers) => {
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	});

	return baseQuery(args, api, extraOptions);
};

export default instance;
