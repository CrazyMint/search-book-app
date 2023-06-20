import { useCallback, useRef } from "react";

const useThrottle = <
	Arguments extends Array<any>,
	ReturnType extends Promise<any> | void
>(
	callback: (...args: Arguments) => ReturnType,
	wait = 0,
	options = {}
): ((...args: Arguments) => ReturnType | void) => {
	// const { leanding, trailing } = options;
	const waitRef = useRef(false);
	const callbackRef = useRef(callback);
	callbackRef.current = callback;
	return useCallback(
		(...args: Arguments) => {
			if (!waitRef.current) {
				waitRef.current = true;
				setTimeout(() => {
					waitRef.current = false;
				}, wait);
				return callbackRef.current(...args);
			}
		},
		[wait]
	);
};

export default useThrottle;
