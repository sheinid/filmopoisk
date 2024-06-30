import { Movie } from "_pages/movie";
import React from "react";

const MoviePage = ({ params }: { params: { id: string } }) => {
	return <Movie movieId={params.id} />;
};

export default MoviePage;
