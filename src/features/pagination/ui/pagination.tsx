import { useSearchParams } from "react-router-dom";
import Arrow from "shared/assets/icons/arrow-right.svg";

import styles from "./pagination.module.css";

interface PaginationProps {
	current?: number;
	total: number;
}

export const Pagination = (props: PaginationProps) => {
	const { current = 1, total } = props;

	const [, setParams] = useSearchParams();

	const navigate = (page: number) => {
		setParams({ page: String(page) });
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
