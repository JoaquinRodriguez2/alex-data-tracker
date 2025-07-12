import { useEffect, useState } from "react";
import { searchTemplates } from "../calls/searchTemplates";

interface Template {
  value: number;
  label: string;
}

export function useGetListOfTemplates(query: string) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    searchTemplates(query)
      .then((result) => {
        setTemplates(result);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch templates.");
        setTemplates([]);
        setLoading(false);
      });
  }, [query]);

  return { templates, loading, error };
}

