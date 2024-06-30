import styles from "./notFound.module.css";

export const NotFound = () => {
	return (
		<div className={styles.root}>
			<span className={styles.title}>Фильмы не найдены</span>
			<span className={styles.subtitle}>
				Измените запрос и попробуйте снова
			</span>
		</div>
	);
};
