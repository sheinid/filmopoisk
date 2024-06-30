import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "app/api";

import { AuthResponse, UserCredentials } from "./types";

export const login = async (credentials: UserCredentials) => {
	const response = await axios.post<AuthResponse>("/login", credentials);
	return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginThunk: any = createAsyncThunk(
	"auth/login",
	async (credentials: UserCredentials, { rejectWithValue }) => {
		try {
			const { token } = await login(credentials);
			localStorage.setItem("token", token);
			return token;
		} catch (error) {
			return rejectWithValue((error as Error)?.message);
		}
	},
);
