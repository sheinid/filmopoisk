import { filtersSlice } from "entities/filters";
import { GENRES, YEARS } from "shared/consts/filters";
import { useStoreDispatch } from "shared/lib/redux/useStoreDispatch";
import { useStoreSelector } from "shared/lib/redux/useStoreSelector";
import { Select } from "shared/ui/select";

import styles from "./filters.module.css";

export const Filters = () => {
	const genres = Object.entries(GENRES).map(([key, value]) => ({
		value: key,
		label: value,
	}));

	const years = Object.entries(YEARS).map(([key, value]) => ({
		value: key,
		label: value,
	}));

	const genreValue = useStoreSelector((state) => state.filters.genre);
	const yearValue = useStoreSelector((state) => state.filters.year);

	const dispatch = useStoreDispatch();

	const handleGenreSelect = (genre: string) => {
		dispatch(filtersSlice.setGenre(genre));
	};

	const selectedGenre = genres.find((genre) => genre.value === genreValue);

	const handleYearSelect = (year: string) => {
		dispatch(filtersSlice.setYear(year));
	};

	const selectedYear = years.find((year) => year.value === yearValue);

	return (
		<div className={styles.filters}>
			<Select
				options={genres}
				selected={selectedGenre || null}
				onChange={handleGenreSelect}
				placeholder="Выберите жанр"
				title="Жанр"
			/>
			<Select
				options={years}
				selected={selectedYear || null}
				onChange={handleYearSelect}
				placeholder="Выберите год"
				title="Год выпуска"
			/>
		</div>
	);
};
