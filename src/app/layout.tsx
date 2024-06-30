import { Metadata } from "next";

import "shared/styles/global.css";

import { Header } from "widgets/header";

import { Providers } from "./providers";

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
					<Header />
					<div id="root">{children}</div>
					<div id="portal-root"></div>
				</body>
			</Providers>
		</html>
	);
}
