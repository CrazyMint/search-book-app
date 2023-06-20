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
	return useCallback(
		(...args: Arguments) => {
			if (!waitRef.current) {
				waitRef.current = true;
				setTimeout(() => {
					waitRef.current = false;
					if (trailing) {
						callbackRef.current(...args);
					}
				}, wait);
				if (leading) {
					console.log(1);
					callbackRef.current(...args);
				}
			}
		},
		[leading, trailing, wait]
	);
};

export default useDebounce;
