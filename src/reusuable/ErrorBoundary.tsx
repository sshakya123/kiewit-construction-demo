import {
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary,
} from 'react-error-boundary';

type ErrorBoundaryProps = {
  children: React.ReactNode;
  FallbackComponent?: React.ComponentType<FallbackProps>;
};

export default function ErrorBoundary({
  children,
  FallbackComponent = ErrorFallback,
}: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary FallbackComponent={FallbackComponent}>
      {children}
    </ReactErrorBoundary>
  );
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
