import SearchIcon from "shared/assets/icons/search-icon.svg";
import { Input } from "shared/ui/input";

import styles from "./search.module.css";

interface SearchProps {
	search: string;
	setSearch: (search: string) => void;
}

export const Search = (props: SearchProps) => {
	const { search, setSearch } = props;

	return (
		<div className={styles.root}>
			<Input
				onChange={(e) => setSearch(e.target.value)}
				value={search}
				icon={SearchIcon}
				placeholder="Название фильма"
			/>
		</div>
	);
};
