import { filtersSlice } from "entities/filters";
import { MovieCard, movieSlice } from "entities/movie";
import { Genre, Year } from "entities/movie/model/types";
import { Filters } from "features/filters/ui/filters";
import { Pagination } from "features/pagination/ui/pagination";
import { Search } from "features/search";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "shared/lib/debounce";
import { useStoreDispatch } from "shared/lib/redux/useStoreDispatch";
import { useStoreSelector } from "shared/lib/redux/useStoreSelector";
import { Loader } from "shared/ui/loader/loader";
import { NotFound } from "widgets/movies/notFound";

import styles from "./movies.module.css";

export const Movies = () => {
	const dispatch = useStoreDispatch();

	const [params, setParams] = useSearchParams();

	const {
		genre: selectedGenre,
		year: selectedYear,
		title: search,
	} = useStoreSelector((state) => state.filters);

	const { debouncedValue: debouncedSearch } = useDebounce(search, 500);

	const currentPage = parseInt(params.get("page") || "1", 10);

	const {
		data: movies,
		isFetching,
		isLoading,
		isError,
	} = movieSlice.useGetMoviesQuery({
		genre: selectedGenre as Genre,
		release_year: selectedYear as Year,
		page: currentPage,
		title: debouncedSearch,
	});

	useEffect(() => {
		const paramsGenre = params.get("genre") || "";
		const paramsYear = params.get("year") || "";
		const paramsTitle = params.get("title") || "";

		dispatch(filtersSlice.setGenre(paramsGenre));
		dispatch(filtersSlice.setYear(paramsYear));
		dispatch(filtersSlice.setTitle(paramsTitle));
	}, [params, dispatch]);

	useEffect(() => {
		const updatedParams: Record<string, string> = {
			...Object.fromEntries(params.entries()),
			genre: selectedGenre,
			year: selectedYear,
			title: debouncedSearch,
		};

		Object.entries(updatedParams).forEach(([key, value]) => {
			if (value === "" || value === "0") {
				delete updatedParams[key];
			}
		});

		setParams(updatedParams);
	}, [
		currentPage,
		selectedGenre,
		debouncedSearch,
		selectedYear,
		setParams,
		params,
	]);

	return (
		<div className={styles.container}>
			<div className={styles.sidebar}>
				<div className={styles.title}>Фильтр</div>
				<Filters />
			</div>
			<div className={styles.content}>
				<Search
					search={search}
					setSearch={(s) => dispatch(filtersSlice.setTitle(s))}
				/>
				<ul className={styles.list}>
					{(isFetching || isLoading) && <Loader />}

					{isError && <li>Произошла ошибка</li>}

					{!isFetching && !movies?.search_result.length && <NotFound />}

					{!isFetching &&
						movies &&
						movies.search_result.map((movie) => (
							<MovieCard key={movie.id} {...movie} />
						))}
				</ul>
				<Pagination total={movies?.total_pages || 0} current={currentPage} />
			</div>
		</div>
	);
};
