"use client";

import { movieSlice } from "entities/movie";
import { Rating } from "features/rating";
import Image from "next/image";
import { Loader } from "shared/ui/loader/loader";

import styles from "./movie.module.css";

export const Movie = ({ movieId }: { movieId: string }) => {
	const { data, isFetching } = movieSlice.useGetMovieQuery(movieId || "");

	if (!isFetching && !data) {
		console.error("Movie not found");
		return <div>Такого фильма не существует</div>;
	}

	if (isFetching) {
		return <Loader />;
	}

	return (
		<>
			<section className={styles.container}>
				<div className={styles.cover}>
					<Image fill src={data?.poster || ""} alt="" />
				</div>
				<div className={styles.content}>
					<div className={styles.header}>
						<h1 className={styles.title}>{data?.title}</h1>
						<div className={styles.rating}>
							<Rating movieId={movieId || ""} />
						</div>
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
							<Image
								width={160}
								height={230}
								className={styles.actorphoto}
								src={actor.photo}
								alt=""
							/>
							<span className={styles.actorname}>{actor.name}</span>
						</li>
					))}
				</ul>
			</section>
		</>
	);
};
