import { GENRES, YEARS } from "shared/consts/filters";

type FullMovieInfo = {
	id: string;
	title: string;
	description: string;
	release_year: number;
	poster: string; //base64 img
	genre: string;
	rating: string; //float
	total_rates_count: string; //int
	actors: Actor[];
};

type Actor = {
	name: string;
	photo: string;
};

type ShortMovieInfo = Omit<FullMovieInfo, "actors" | "total_rates_count">;

type Year = keyof typeof YEARS;

type Genre = keyof typeof GENRES;

interface MovieSearchRequest {
	title?: string;
	genre?: Genre;
	release_year?: Year;
	sort_by?: "release_year" | "title" | "rating";
	order?: "asc" | "desc";
	page: number;
	limit?: number;
}

interface MovieSearchResponse {
	search_result: ShortMovieInfo[];
	total_pages: number;
}

interface PaginatedResponse<T> {
	total_pages: number;
	search_result: T[];
}

export type {
	PaginatedResponse,
	FullMovieInfo,
	Actor,
	Year,
	Genre,
	ShortMovieInfo,
	MovieSearchRequest,
	MovieSearchResponse,
};
