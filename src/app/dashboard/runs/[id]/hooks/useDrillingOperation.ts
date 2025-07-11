"use clien"
import { useState, useEffect } from "react";
import { getDrillingOperation, postDrillingOperation } from "../calls/drillingOperationApi";

export function useDrillingOperation(id: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getDrillingOperation(id)
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const save = async (values: any) => {
    setLoading(true);
    setError(null);
    try {
      await postDrillingOperation(id, values);
      setData(values);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, save };
}
