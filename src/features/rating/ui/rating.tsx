import { clsx } from "clsx";
import { movieSlice } from "entities/movie";
import { useAuth } from "features/auth/lib/useAuth";
import { useEffect, useState } from "react";
import { Star } from "shared/ui/star";

import styles from "./rating.module.css";

interface RatingProps {
	movieId: string;
}

export const Rating = (props: RatingProps) => {
	const { movieId } = props;

	const { isAuth } = useAuth();

	const [rating, setRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);

	const [rateMovie] = movieSlice.useRateMovieMutation();

	const handleRating = async (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		rate: number,
	) => {
		e.preventDefault();
		e.stopPropagation();

		const ratingValue = rate === rating ? 0 : rate;
		setRating(ratingValue);

		try {
			await rateMovie({ id: movieId, rating: ratingValue });
			const userRating = JSON.parse(localStorage.getItem("userRating")!) || {};
			userRating[movieId] = ratingValue;
			localStorage.setItem("userRating", JSON.stringify(userRating));
		} catch (error) {
			console.error(error);
		}
	};

	const handleMouseEnter = (rate: number) => {
		setHoverRating(rate);
	};

	const handleMouseLeave = () => {
		setHoverRating(0);
	};

	const isRatingHovered = hoverRating > 0;

	useEffect(() => {
		const userRating = JSON.parse(localStorage.getItem("userRating")!) || {};
		const rating = userRating[movieId];

		rating && setRating(rating);
	}, [movieId]);

	if (!isAuth) return null;

	return (
		<div className={styles.container}>
			{[1, 2, 3, 4, 5].map((value) => (
				<div
					key={value}
					className={styles.rating}
					onClick={(e) => handleRating(e, value)}
					onMouseEnter={() => handleMouseEnter(value)}
					onMouseLeave={handleMouseLeave}
				>
					<span className={styles.star}>
						{isRatingHovered && value > hoverRating && <Star />}
						{isRatingHovered && value <= hoverRating && (
							<Star fill className={styles.hovered} />
						)}
						{!isRatingHovered && value <= rating && (
							<Star fill className={styles.filled} />
						)}
						{!isRatingHovered && value > rating && <Star />}
					</span>
					<span
						className={clsx(styles.number, {
							[styles.hovered]: isRatingHovered,
						})}
						data-highlighted={rating >= value}
					>
						{value}
					</span>
				</div>
			))}
		</div>
	);
};
