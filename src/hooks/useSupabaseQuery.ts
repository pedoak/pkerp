import { useState, useEffect } from 'react';
import { withRetry } from '../utils/api';

interface UseSupabaseQueryOptions<T> {
  queryFn: () => Promise<T>;
  onError?: (error: any) => void;
  dependencies?: any[];
}

export function useSupabaseQuery<T>({ 
  queryFn, 
  onError,
  dependencies = []
}: UseSupabaseQueryOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await withRetry(queryFn);
        setData(result);
      } catch (err) {
        setError(err as Error);
        onError?.(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: () => {} };
}