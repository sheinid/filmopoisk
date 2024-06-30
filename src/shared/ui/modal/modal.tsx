import { HTMLAttributes, ReactNode } from "react";
import { createPortal } from "react-dom";

import styles from "./modal.module.css";

interface ModalProps
	extends Exclude<HTMLAttributes<HTMLDivElement>, "onClick"> {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

export const Modal = (props: ModalProps) => {
	const { children, isOpen, onClose } = props;

	if (!isOpen) return null;

	return createPortal(
		<div className={styles.backdrop} onClick={onClose}>
			<div className={styles.root} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
			;
		</div>,
		document.getElementById("portal-root")!,
	);
};
