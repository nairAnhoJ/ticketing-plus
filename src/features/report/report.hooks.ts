import { useEffect, useRef, useState } from "react";

export const useCountAnimation = (end: number) => {
	const prev = useRef(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		let frame: number;
		const duration = 500;
		const startTime = performance.now();

		const start = prev.current;

		const animate = (time: number) => {
			const progress = Math.min(
				(time - startTime) / duration,
				1
			);

			const value = start + (end - start) * progress;

			setCount(Math.floor(value));

			if (progress < 1) {
				frame = requestAnimationFrame(animate);
			} else {
				prev.current = end;
			}
		};

		frame = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(frame);
	}, [end]);

	return count;
};