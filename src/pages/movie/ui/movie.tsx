import { movieSlice } from "entities/movie";
import { useParams } from "react-router-dom";

import styles from "./movie.module.css";

const Movie = () => {
	const { movieId } = useParams();

	const { data, isFetching } = movieSlice.useGetMovieQuery(movieId || "");

	if (!isFetching && !data) {
		console.error("Movie not found");
		return <div>Такого фильма не существует</div>;
	}

	return (
		<>
			<section className={styles.container}>
				<div className={styles.cover}>
					<img src={data?.poster} alt="" />
				</div>
				<div className={styles.content}>
					<div className={styles.header}>
						<h1 className={styles.title}>{data?.title}</h1>
						<div className={styles.rating}></div>
					</div>

					<div className={styles.info}>
						<div className={styles.attribute}>
							<span>Жанр:</span>
							{data?.genre}
						</div>
						<div className={styles.attribute}>
							<span>Год выпуска:</span>
							{data?.release_year}
						</div>
						<div className={styles.attribute}>
							<span>Рейтинг:</span> {data?.rating}
						</div>

						<div>
							<span>Описание</span> <br />
							<p className={styles.description}>{data?.description}</p>
						</div>
					</div>
				</div>
			</section>

			<section className={styles.actors}>
				<h2 className={styles.actorstitle}>Актеры</h2>

				<ul className={styles.list}>
					{data?.actors.map((actor) => (
						<li key={actor.name} className={styles.actor}>
							<img className={styles.actorphoto} src={actor.photo} alt="" />
							<span className={styles.actorname}>{actor.name}</span>
						</li>
					))}
				</ul>
			</section>
		</>
	);
};

export default Movie;
