import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
	name: "filters",
	initialState: {
		genre: "",
		year: "",
		title: "",
	},
	reducers: {
		setGenre(state, action) {
			state.genre = action.payload;
		},
		setYear(state, action) {
			state.year = action.payload;
		},
		setTitle(state, action) {
			state.title = action.payload;
		},
	},
});

export const { setGenre, setYear, setTitle } = filtersSlice.actions;
export default filtersSlice.reducer;
