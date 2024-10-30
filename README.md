# tried

A simple, small, zero dependency try-catch wrapper. It provides a safe way to handle code that may throw errors, both synchronously and asynchronously. It allows for fallback values when an error occurs.

## Installation

Install the package using `npm install tried` or your package manager's equivalent.

```bash
npm install tried
```

## Syntax

```typescript
Try<T>(
  fn: () => T | Promise<T>,
  fallback?: T | (() => T | Promise<T>)
): T | Promise<T>
```

- `fn`: The primary function to execute.
- `fallback`: (Optional) The fallback value or function if `fn` throws an error.

### Return Value

- Returns the result of `fn` if it executes without errors.
- Returns `fallback` if `fn` throws an error.
- Returns `null` if `fn` fails and no `fallback` is provided.

## Examples

#### Synchronous Usage

```typescript
Try(() => 2 + 2); // Returns 4

Try(() => {
	throw new Error();
}, "fallback"); // Returns "fallback"
```

#### Asynchronous Usage

```typescript
await Try(async () => 2 + 2); // Returns 4

await Try(async () => {
	throw new Error();
}, "fallback"); // Returns "fallback"
```

#### Fallback as a Function

```typescript
Try(
	() => {
		throw new Error();
	},
	() => "fallback"
); // Returns "fallback"

await Try(
	async () => {
		throw new Error();
	},
	async () => "fallback"
); // Returns "fallback"
```
