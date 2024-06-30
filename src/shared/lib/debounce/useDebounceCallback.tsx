import { useMemo } from "react";

export const debounce = <Params extends unknown[]>(
	callback: (...args: Params) => void,
	delay: number,
): ((...args: Params) => void) => {
	let timer: ReturnType<typeof setTimeout>;

	return function (...args: Params) {
		clearTimeout(timer);
		timer = setTimeout(() => callback(...args), delay);
	};
};

export const useDebounceCallback = <Params extends unknown[], Return>(
	callback: (...args: Params) => Return,
	delay: number,
) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounced = useMemo(() => debounce(callback, delay), [delay]);

	return debounced;
};
