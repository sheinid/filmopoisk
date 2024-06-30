import { filtersSlice } from "entities/filters";
import { MovieCard, movieSlice } from "entities/movie";
import { Genre, Year } from "entities/movie/model/types";
import { Filters } from "features/filters/ui/filters";
import { Search } from "features/search";
import { useDebounce } from "shared/lib/debounce";
import { useStoreDispatch } from "shared/lib/redux/useStoreDispatch";
import { useStoreSelector } from "shared/lib/redux/useStoreSelector";
import { Loader } from "shared/ui/loader/loader";
import { NotFound } from "widgets/movies/notFound";

import styles from "./movies.module.css";

export const Movies = () => {
	const dispatch = useStoreDispatch();

	const {
		genre: selectedGenre,
		year: selectedYear,
		title: search,
	} = useStoreSelector((state) => state.filters);

	const { debouncedValue: debouncedSearch } = useDebounce(search, 500);

	const {
		data: movies,
		isFetching,
		isLoading,
		isError,
	} = movieSlice.useGetMoviesQuery({
		genre: selectedGenre as Genre,
		release_year: selectedYear as Year,
		page: 1,
		title: debouncedSearch,
	});

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
			</div>
		</div>
	);
};
