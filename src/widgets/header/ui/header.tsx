"use client";

import { useAuth } from "features/auth/lib/useAuth";
import { LoginButton } from "features/auth/ui/loginButton/loginButton";
import Image from "next/image";
import Link from "next/link";
import UserIcon from "shared/assets/icons/user-icon.svg";
import { Button } from "shared/ui/button";

import styles from "./header.module.css";

export const Header = () => {
	const { isAuth, logout } = useAuth();

	return (
		<header className={styles.header}>
			<Link href="/" className={styles.logo}>
				Фильмопоиск
			</Link>

			{isAuth && (
				<div className={styles.logout}>
					<Image src={UserIcon} alt="User icon" />
					<Button variant="ghost" onClick={logout}>
						Выйти
					</Button>
				</div>
			)}

			{!isAuth && <LoginButton />}
		</header>
	);
};
