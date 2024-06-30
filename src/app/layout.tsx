import { Metadata } from "next";

import "shared/styles/global.css";

import { Header } from "widgets/header";

import { Providers } from "./providers";

import styles from "app/layout/layout.module.css";

export const metadata: Metadata = {
	title: "Фильмопоиск",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru">
			<Providers>
				<body>
					<div id="root">
						<Header />
						<main className={styles.main}>{children}</main>
					</div>
					<div id="portal-root"></div>
				</body>
			</Providers>
		</html>
	);
}
