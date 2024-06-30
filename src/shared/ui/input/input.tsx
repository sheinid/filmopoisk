import clsx from "clsx";
import {
	ChangeEvent,
	InputHTMLAttributes,
	useId,
	useRef,
	useState,
} from "react";
import InputCrossIcon from "shared/assets/icons/input-cross.svg";

import styles from "./input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	icon?: string;
	label?: string;
	isSearchInput?: boolean;
}

export const Input = (props: InputProps) => {
	const {
		className,
		onChange,
		value,
		placeholder,
		onBlur,
		onKeyDown,
		onFocus,
		icon,
		label,
		isSearchInput = false,
		required,
	} = props;

	const [inputValue, setInputValue] = useState("");

	const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const inputRef = useRef<HTMLInputElement>(null);

	const handleReset = () => {
		if (inputRef.current) {
			inputRef.current.value = "";
			inputRef.current.focus();

			if (onChange) {
				onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
			}
		}
	};

	const id = useId();

	return (
		<label htmlFor={id} className={styles.label}>
			{label && (
				<span data-is-required={required} className={styles.labeltext}>
					{label}
				</span>
			)}
			<div
				className={clsx(styles.root, className, {
					[styles.search]: isSearchInput,
				})}
			>
				{icon && <img src={icon} alt="" className={styles.icon} />}
				<input
					ref={inputRef}
					id={id}
					type="text"
					placeholder={placeholder}
					className={styles.input}
					value={value ?? inputValue}
					onChange={onChange ?? onChangeInputValue}
					onBlur={onBlur}
					onKeyDown={onKeyDown}
					onFocus={onFocus}
					required={required}
				/>
				{value && (
					<img
						src={InputCrossIcon}
						alt=""
						className={styles.cross}
						onClick={handleReset}
					/>
				)}
			</div>
		</label>
	);
};
