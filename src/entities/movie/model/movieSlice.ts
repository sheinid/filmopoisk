import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
	FullMovieInfo,
	MovieSearchRequest,
	PaginatedResponse,
	ShortMovieInfo,
} from "./types";

export const movieSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_URL,
	}),
	endpoints: (builder) => ({
		getMovies: builder.query<
			PaginatedResponse<ShortMovieInfo>,
			MovieSearchRequest
		>({
			query: (params) => {
				const queryParams = new URLSearchParams();
				if (params.genre && params.genre !== "0")
					queryParams.append("genre", params.genre);
				if (params.release_year && params.release_year !== "0")
					queryParams.append("release_year", params.release_year);
				if (params.title && params.title !== "")
					queryParams.append("title", params.title);
				return `search?${queryParams.toString()}&page=${params.page}`;
			},
		}),
		getMovie: builder.query<FullMovieInfo, string>({
			query: (id) => `movie/${id}`,
		}),
		rateMovie: builder.mutation({
			query: ({ id, rating }) => ({
				url: `rateMovie`,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: { movieId: id, user_rate: rating },
			}),
		}),
	}),
});
