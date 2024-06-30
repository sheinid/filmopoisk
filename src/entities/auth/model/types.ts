type UserCredentials = {
	username: string;
	password: string;
};

type AuthResponse = {
	token: string;
};

export type { UserCredentials, AuthResponse };
