import { useEffect, useState } from 'react';
import { getRunsData, Run } from '../calls/getRunsData';

export function useGetRunsData() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRunsData()
      .then(setRuns)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { runs, loading, error };
}
