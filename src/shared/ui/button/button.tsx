import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef } from "react";

import styles from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "solid" | "ghost";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		const { variant = "solid", children, ...rest } = props;

		return (
			<button
				ref={ref}
				{...rest}
				className={clsx(styles.root, styles[variant])}
			>
				{children}
			</button>
		);
	},
);
