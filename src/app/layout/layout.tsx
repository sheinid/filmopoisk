import { Outlet } from "react-router-dom";
import { Header } from "widgets/header";

import styles from "./layout.module.css";

export const Layout = () => {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<Outlet />
			</main>
		</>
	);
};
