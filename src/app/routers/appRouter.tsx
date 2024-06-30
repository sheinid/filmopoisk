import { Layout } from "app/layout";
import Movie from "pages/movie/ui/movie";
import { Movies } from "pages/movies";
import {
	createBrowserRouter,
	RouteObject,
	RouterProvider,
} from "react-router-dom";

export const AppRouter = () => {
	const routes: RouteObject[] = [
		{
			path: "/",
			element: <Layout />,
			errorElement: <div>Something went wrong</div>,
			children: [
				{
					index: true,
					element: <Movies />,
				},
				{
					path: "/movie/:movieId",
					element: <Movie />,
				},
			],
		},
	];

	const router = createBrowserRouter(routes);

	return <RouterProvider router={router} />;
};
