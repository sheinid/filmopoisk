import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";

export const AppRouter = () => {
	const routes = createRoutesFromElements(
		<Route path="/" element={<>Hello world</>}></Route>,
	);

	const router = createBrowserRouter(routes, {});

	return (
		<div className="app">
			<RouterProvider router={router} />
		</div>
	);
};
