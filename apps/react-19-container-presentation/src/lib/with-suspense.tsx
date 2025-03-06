import { Suspense } from 'react';

export function withSuspense<P extends object = {}>(
  Component: React.FunctionComponent<P>,
  options: { fallback: React.ReactNode },
) {
  return (props: P) => (
    <Suspense fallback={options.fallback}>
      <Component {...props} />
    </Suspense>
  );
}
