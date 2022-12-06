import {
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary,
} from 'react-error-boundary';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}​​​​​​</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
