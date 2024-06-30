import Image from "next/image";
import LoaderIcon from "shared/assets/icons/loader.svg";

import styles from "./loader.module.css";

export const Loader = () => {
	return (
		<div className={styles.root}>
			<Image src={LoaderIcon} alt="loader" className={styles.loader} />
		</div>
	);
};
