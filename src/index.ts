export type Tried<T> = T extends Promise<never>
	? Promise<Awaited<T> | null | undefined>
	: T | null | undefined;

/**
 * Calls a function and returns the result, or null if it throws an error.
 * If the function returns a promise, it is resolved and the result is returned,
 * or null if the promise rejects.
 *
 * @param fn The function to run.
 * @param fallback An optional callback to run if an error occurs. This callback receives the error as its only argument.
 * @returns The result of calling the function, or null if an error occurs.
 */
export function Try<T, K = Error, V = T>(
	fn: () => T,
	fallback?: ((e: K) => V) | T | V
): Tried<T | V> {
	try {
		const data = fn();

		if (data instanceof Promise) {
			return data.catch((err) => {
				if (fallback instanceof Function) {
					return fallback(err) ?? null;
				}
				return fallback ?? null;
			}) as Tried<T | V>;
		}

		return data as Tried<T>;
	} catch (err) {
		if (fallback instanceof Function) {
			return (fallback(err as K) ?? null) as Tried<T | V>;
		}
		return (fallback ?? null) as Tried<T>;
	}
}

export default Try;
