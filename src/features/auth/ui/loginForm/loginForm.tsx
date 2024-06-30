/* eslint-disable no-mixed-spaces-and-tabs */

import { loginThunk } from "entities/auth/model/loginThunk";
import Image from "next/image";
import { ChangeEvent, useReducer } from "react";
import Cross from "shared/assets/icons/close.svg";
import { useStoreDispatch } from "shared/lib/redux/useStoreDispatch";
import { useStoreSelector } from "shared/lib/redux/useStoreSelector";
import { Button } from "shared/ui/button";
import { Input } from "shared/ui/input";

import styles from "./loginForm.module.css";

interface LoginFormProps {
	onClose?: () => void;
}

interface Idto {
	username: string;
	password: string;
}

type Action =
	| {
			type: "SET_USERNAME";
			payload: string;
	  }
	| {
			type: "SET_PASSWORD";
			payload: string;
	  };

const defaultValues: Idto = {
	username: "",
	password: "",
};

export const LoginForm = (props: LoginFormProps) => {
	const { onClose } = props;

	const loading = useStoreSelector((state) => state.auth.loading);

	const [state, reducerDispatch] = useReducer(function (
		state: Idto,
		action: Action,
	) {
		switch (action.type) {
			case "SET_USERNAME":
				return { ...state, username: action.payload };
			case "SET_PASSWORD":
				return { ...state, password: action.payload };
			default:
				return state;
		}
	}, defaultValues);

	const dispatch = useStoreDispatch();

	const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
		reducerDispatch({ type: "SET_USERNAME", payload: event.target.value });
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		reducerDispatch({ type: "SET_PASSWORD", payload: event.target.value });
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		state.username &&
			state.password &&
			dispatch(loginThunk(state)).then(onClose);
	};

	return (
		<form className={styles.root} onSubmit={handleSubmit}>
			<div className={styles.header}>
				<span className={styles.title}>Авторизация</span>
				<Image className={styles.cross} src={Cross} alt="" onClick={onClose} />
			</div>
			<div className={styles.inputs}>
				<Input
					placeholder="Введите логин"
					label="Логин"
					required
					value={state.username}
					onChange={handleUsernameChange}
				/>
				<Input
					placeholder="Введите пароль"
					label="Пароль"
					type="password"
					value={state.password}
					onChange={handlePasswordChange}
					required
				/>
			</div>

			<div className={styles.buttons}>
				<Button disabled={loading} type="submit">
					Войти
				</Button>
				<Button disabled={loading} variant="ghost" onClick={onClose}>
					Отмена
				</Button>
			</div>
		</form>
	);
};
