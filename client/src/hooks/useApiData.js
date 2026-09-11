import { useState, useEffect, useCallback } from 'react';

/**
 * Generic custom hook to fetch data from backend API with automatic loading & error state handling.
 *
 * @param {Function} fetcherFn - Async function that calls the API
 * @param {Array} deps - Dependency array that triggers re-fetching when changed
 * @param {Object} [initialData=null] - Initial fallback data
 */
export function useApiData(fetcherFn, deps = [], initialData = null) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const executeFetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcherFn();
      setData(result);
    } catch (err) {
      console.error('[useApiData Error]', err);
      setError(err.message || 'Gagal memuat data dari server');
    } finally {
      setLoading(false);
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  return {
    data,
    loading,
    error,
    refetch: executeFetch,
  };
}

export default useApiData;
