const myDebounce = (cb, time, opt) => {
	let timeout;
	let done = true;
	const leading = opt?.leading ?? false;
	const trailing = opt?.trailing ?? true;

	const debouncedFn = () => {
		if (!done) {
			clearTimeout(timeout);
		} else {
			leading && cb();
		}
		done = false;
		timeout = setTimeout(() => {
			done = true;
			trailing && cb();
		}, time);
	};

	return debouncedFn;
};

//no two action can be fired within one interval

const myThrottle = (cb, time, opt) => {
	const leading = opt?.leading ?? true;
	const trailing = opt?.trailing ?? true;
	let done = true;
	let isCalledDuringInterval = false;
	const fire = () => {
		done = false;
		cb();
		setTimeout(() => {
			done = true;
			if (isCalledDuringInterval) {
				console.log("trailing", isCalledDuringInterval);
				trailing && fire();
			}
			isCalledDuringInterval = false;
		}, time);
	};
	const throttledFn = () => {
		if (done) {
			leading && fire();
		} else {
			isCalledDuringInterval = true;
		}
	};
	return throttledFn;
};

const test = () => {
	console.log("test");
};

const debouncedFunction = myDebounce(test, 3000, {
	leading: true,
	trailing: false,
});

const throttledFunction = myThrottle(test, 3000, {
	leading: false,
	trailing: true,
});
export default function App() {
	return (
		<div className="App">
			<button onClick={throttledFunction}>test</button>
		</div>
	);
}
