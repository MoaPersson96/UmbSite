import { useRouter } from "@tanstack/react-router";

export function DefaultErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <h1>Something went wrong</h1>

        <pre>{error.message}</pre>

        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}