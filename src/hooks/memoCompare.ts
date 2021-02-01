import { useEffect, useRef } from "react";

export function useMemoCompare<T>(
	next: T,
	compare: (previous: T | undefined, next?: T) => boolean
): T {
	const previousRef = useRef<T>();
	const previous = previousRef.current;

	const isEqual = compare(previous, next);

	useEffect(() => {
		if (!isEqual) {
			previousRef.current = next;
		}
	});

	return isEqual && previous !== undefined ? previous : next;
}
