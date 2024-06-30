import { Link } from "react-router-dom";

import styles from "./header.module.css";

export const Header = () => {
	return (
		<header className={styles.header}>
			<Link to="/" className={styles.logo}>
				Фильмопоиск
			</Link>

			<button>Войти</button>
		</header>
	);
};
