import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "entities/auth";
import { filtersSlice } from "entities/filters";
import { movieSlice } from "entities/movie";

export const store = configureStore({
	reducer: {
		auth: authSlice.default,
		filters: filtersSlice.default,
		[movieSlice.reducerPath]: movieSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(movieSlice.middleware);
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
