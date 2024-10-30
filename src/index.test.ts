import { expect, test } from "bun:test";

import Try from ".";

test("Synchronous tests", () => {
	expect(Try(() => 2 + 2)).toBe(4);

	expect(Try(() => 2 + 2, "fallback")).toBe(4);

	expect(
		Try(
			() => 2 + 2,
			() => "fallback"
		)
	).toBe(4);

	expect(
		Try(() => {
			throw new Error();
		})
	).toBe(null);

	expect(
		Try(() => {
			throw new Error();
		}, "fallback")
	).toBe("fallback");

	expect(
		Try(
			() => {
				throw new Error();
			},
			() => "fallback"
		)
	).toBe("fallback");

	expect(
		Try(
			() => {
				throw new Error();
			},
			() => {}
		)
	).toBe(null);
});

test("Async tests", async () => {
	expect(await Try(async () => 2 + 2)).toBe(4);

	expect(await Try(async () => 2 + 2, "fallback")).toBe(4);

	expect(
		await Try(async () => {
			throw new Error();
		})
	).toBe(null);

	expect(
		await Try(async () => {
			throw new Error();
		}, "fallback")
	).toBe("fallback");

	expect(
		await Try(
			async () => {
				throw new Error();
			},
			() => "fallback"
		)
	).toBe("fallback");

	expect(
		await Try(
			async () => {
				throw new Error();
			},
			async () => "fallback"
		)
	).toBe("fallback");

	expect(Try(async () => 2 + 2)).toEqual(Promise.resolve(4));

	expect(
		await Try(
			async () => {
				throw new Error();
			},
			() => {}
		)
	).toEqual(null);
});
