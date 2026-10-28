import { useCallback, useEffect, useState } from 'react';

// Custom hook: concentra fetch, loading, error y refetch.
// La pantalla decide cómo mostrar cada estado.
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  const refetch = useCallback(() => setAttempt((value) => value + 1), []);

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return undefined;
    }

    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
        const json = await response.json();
        if (!Array.isArray(json)) throw new Error('La API debe devolver una lista de productos.');
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'No se pudieron cargar los productos.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [url, attempt]);

  return { data, loading, error, refetch };
}
