import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ArrowDown from "shared/assets/icons/arrow-down.svg";

import styles from "./select.module.css";

type Option = {
	value: string;
	label: string;
};

interface SelectProps {
	title?: string;
	selected: Option | null;
	options: Option[];
	placeholder?: string;
	onChange?: (selected: Option["value"]) => void;
	onClose?: () => void;
	className?: string;
}

export const Select = (props: SelectProps) => {
	const {
		title,
		options,
		onClose,
		onChange,
		selected,
		placeholder,
		className,
	} = props;

	const [isOpen, setIsOpen] = useState(false);

	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				isOpen && onClose?.();
				setIsOpen(false);
			}
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [isOpen, onClose]);

	const handleOptionClick = (value: Option["value"]) => {
		setIsOpen(false);
		onChange?.(value);
	};

	const handlePlaceholderClick = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={styles.container}>
			{title && <div className={styles.title}>{title}</div>}
			<div
				className={clsx(styles.root, className)}
				ref={rootRef}
				data-is-active={isOpen}
			>
				<div
					role="button"
					tabIndex={0}
					className={styles.placeholder}
					data-selected={!!selected}
					onClick={handlePlaceholderClick}
					data-focus={isOpen}
				>
					{selected?.label || placeholder}
				</div>
				{isOpen && (
					<ul className={styles.options}>
						{options.map((option) => (
							<li
								key={option.value}
								className={styles.option}
								data-selected={option.value === selected?.value}
								onClick={() => handleOptionClick(option.value)}
								tabIndex={0}
							>
								{option.label}
							</li>
						))}
					</ul>
				)}

				<Image
					className={styles.arrow}
					src={ArrowDown}
					alt="select chevron down"
				/>
			</div>
		</div>
	);
};
