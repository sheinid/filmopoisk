import LoaderIcon from "shared/assets/icons/loader.svg";

import styles from "./loader.module.css";

export const Loader = () => {
	return (
		<div className={styles.root}>
			<img src={LoaderIcon} alt="loader" className={styles.loader} />
		</div>
	);
};
