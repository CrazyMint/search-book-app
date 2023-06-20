import { useCallback, useRef } from "react";

export interface Options {
	leading?: boolean;
	trailing?: boolean;
}

const useThrottle = <
	Arguments extends Array<any>,
	ReturnType extends Promise<any> | void
>(
	callback: (...args: Arguments) => ReturnType,
	wait = 0,
	options?: Options
): ((...args: Arguments) => ReturnType | void) => {
	const waitRef = useRef(false);
	const callbackRef = useRef(callback);
	callbackRef.current = callback;
	const { leading = true, trailing = true } = options || {};
	return useCallback(
		(...args: Arguments) => {
			if (!waitRef.current) {
				console.log(leading, trailing);
				waitRef.current = true;
				setTimeout(() => {
					waitRef.current = false;
					if (trailing) {
						callbackRef.current(...args);
					}
				}, wait);
				if (leading) {
					return callbackRef.current(...args);
				}
			}
		},
		[leading, trailing, wait]
	);
};

export default useThrottle;
