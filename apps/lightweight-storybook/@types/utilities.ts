/* eslint-disable @typescript-eslint/no-unused-vars */
type MutateResultArg<S = undefined, F = undefined> = { success?: S; failure?: F };

type MutateResultSuccess<T = undefined> = undefined extends T ? { success: true } : { success: true; data: T };
type MutateResultFailure<T = undefined> = undefined extends T
  ? { success: false; reason?: string | undefined }
  : { success: false; reason?: string | undefined; data: T };

/**
 * Presenterで非同期処理を扱う時に使う型
 *
 * @example
 * ```typescript
 * type R0 = MutateResult // -> { success: true } | { success: false; reason?: string }
 * type R1 = MutateResult<{ success: { value: number } }> // -> { success: true; data: { value: number } } | { success: false; reason?: string }
 * type R2 = MutateResult<{ failure: { errorCode: string } }> // -> { success: true; } | { success: false; reason?: string; data: { errorCode: string } }
 * type R3 = MutateResult<{ success: { value: number } , failure: { errorCode: string } }> // -> { success: true; data: { value: number } } | { success: false; reason?: string; data: { errorCode: string } }
 * ```
 */
type MutateResult<
  T extends MutateResultArg<Record<string, unknown> | undefined, Record<string, unknown> | undefined> = MutateResultArg,
> = T extends MutateResultArg<infer S, infer F> ? MutateResultSuccess<S> | MutateResultFailure<F> : never;

type StorybookProps<
  ContainerProps extends Record<string, unknown>,
  PresenterProps extends Record<string, unknown>,
> = Omit<PresenterProps, keyof ContainerProps>;
