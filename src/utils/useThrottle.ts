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
				waitRef.current = true;
				if (leading) {
					callbackRef.current(...args);
				}
				setTimeout(() => {
					waitRef.current = false;
					trailing && callbackRef.current(...args);
				}, wait);
			}
		},
		[leading, trailing, wait]
	);
};

export default useThrottle;
