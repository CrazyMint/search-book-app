import { useCallback, useRef } from "react";
import { Options } from "./useThrottle";

const useDebounce = <
	Arguments extends Array<any>,
	ReturnType extends Promise<any> | void
>(
	callback: (...args: Arguments) => ReturnType,
	wait = 0,
	options?: Options
): ((...args: Arguments) => ReturnType | void) => {
	const { leading = false, trailing = true } = options || {};
	const waitRef = useRef(false);
	const callbackRef = useRef(callback);
	callbackRef.current = callback;
	const timeout = useRef<any>();
	return useCallback(
		(...args: Arguments) => {
			if (waitRef.current) {
				clearTimeout(timeout.current);
			} else {
				leading && callbackRef.current(...args);
			}

			waitRef.current = true;
			timeout.current = setTimeout(() => {
				waitRef.current = false;
				trailing && callbackRef.current(...args);
			}, wait);
		},
		[leading, trailing, wait]
	);
};

export default useDebounce;
