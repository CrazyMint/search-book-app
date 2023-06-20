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
	// const { leanding = false, trailing = true } = options;
	const waitRef = useRef(false);
	const callbackRef = useRef(callback);
	callbackRef.current = callback;
	return useCallback(
		(...args: Arguments) => {
			if (!waitRef.current) {
				waitRef.current = true;
				let res;
				setTimeout(() => {
					waitRef.current = false;
					res = callbackRef.current(...args);
				}, wait);
				console.log(res);
				return res;
			}
		},
		[wait, options]
	);
};

export default useDebounce;
