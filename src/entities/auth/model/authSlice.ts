import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { loginThunk } from "./loginThunk";

export interface AuthState {
	loading: boolean;
	token: string | null;
	error: string | null;
}

const initialState: AuthState = {
	loading: false,
	token: localStorage.getItem("token") || null,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		logout: (state) => {
			state.token = null;
			localStorage.removeItem("token");
			localStorage.removeItem("userRating");
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginThunk.fulfilled, (state, action: PayloadAction<string>) => {
				state.loading = false;
				state.token = action.payload;
			})
			.addCase(loginThunk.rejected, (state) => {
				state.loading = false;
				state.error = "Неверный логин или пароль";
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
