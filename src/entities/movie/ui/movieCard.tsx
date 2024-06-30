import clsx from "clsx";
import { Rating } from "features/rating";
import Image from "next/image";
import Link from "next/link";

import { ShortMovieInfo } from "../model/types";

import styles from "./movieCard.module.css";

export const MovieCard = (props: ShortMovieInfo) => {
	const { id, title, description, release_year, genre, poster } = props;

	return (
		<li className={styles.wrapper}>
			<Link className={styles.root} href={`/movie/${id}`}>
				<div className={styles.cover}>
					<Image fill src={poster} alt="" />
				</div>
				<div className={styles.container}>
					<div className={styles.content}>
						<h3 className={styles.title}>{title}</h3>

						<div className={styles.info}>
							<div className={clsx(styles.info, styles.left)}>
								<p>Жанр</p>
								<p>Год выпуска</p>
								<p>Описание</p>
							</div>
							<div className={clsx(styles.info, styles.right)}>
								<p>{genre}</p>
								<p>{release_year}</p>
								<p className={styles.description}>{description}</p>
							</div>
						</div>
					</div>
					<div className={styles.rating}>
						<Rating movieId={id} />
					</div>
				</div>
			</Link>
		</li>
	);
};
