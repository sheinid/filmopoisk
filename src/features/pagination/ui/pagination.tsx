import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Arrow from "shared/assets/icons/arrow-right.svg";

import styles from "./pagination.module.css";

interface PaginationProps {
	current?: number;
	total: number;
}

export const Pagination = (props: PaginationProps) => {
	const { current = 1, total } = props;
	const searchParams = useSearchParams();

	const pathname = usePathname();

	const router = useRouter();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams?.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	const navigate = (page: number) => {
		router.push(`${pathname}?${createQueryString("page", String(page))}`);
	};

	if (total === 0) {
		return null;
	}

	return (
		<div className={styles.root}>
			<button
				className={styles.button}
				disabled={current === 1 || total === 0}
				onClick={() => navigate(current - 1 === 0 ? 1 : current - 1)}
			>
				<img src={Arrow} alt="arrow" style={{ transform: "rotate(180deg)" }} />
			</button>
			<div className={styles.current}>{current}</div>
			<button
				className={styles.button}
				disabled={current === total || total === 0}
				onClick={() => navigate(current + 1)}
			>
				<img src={Arrow} alt="arrow" />
			</button>
		</div>
	);
};
