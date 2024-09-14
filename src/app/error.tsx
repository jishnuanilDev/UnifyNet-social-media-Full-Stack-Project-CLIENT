"use client"; // Needed because it's a client-side component

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  useEffect(() => {
    console.error('error console in error.tsx',error); 
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
