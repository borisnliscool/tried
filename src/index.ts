type Tried<T> = T extends Promise<never>
	? Promise<Awaited<T> | null>
	: T | null;

/**
 * Calls a function and returns the result, or null if it throws an error.
 * If the function returns a promise, it is resolved and the result is returned,
 * or null if the promise rejects.
 *
 * @param fn The function to run.
 * @param ct An optional callback to run if an error occurs. This callback receives the error as its only argument.
 * @returns The result of calling the function, or null if an error occurs.
 */
export function Try<T, K = Error, V = T>(
	fn: () => T,
	ct?: ((e: K) => V) | T | V
): Tried<T | V> {
	try {
		const d = fn();

		if (d instanceof Promise) {
			return d
				.then((v) => v)
				.catch((e) => {
					if (ct instanceof Function) return ct(e);
					return ct ?? null;
				}) as Tried<T | V>;
		}

		return d as Tried<T>;
	} catch (e) {
		if (ct instanceof Function) return ct(e as K) as Tried<T | V>;
		return (ct ?? null) as Tried<T>;
	}
}

export default Try;
