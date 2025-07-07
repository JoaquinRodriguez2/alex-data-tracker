import { useEffect, useState } from "react";
import { getAllTemplateData } from "../calls/getAllTemplateData";

interface Template {
  // Define your template fields here, e.g.:
  id: number;
  name: string;
  // ...other fields
}

export function useGetListOfTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getAllTemplateData()
      .then((result) => {
        setTemplates(result.templates || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch templates.");
        setTemplates([]);
        setLoading(false);
      });
  }, []);

  return { templates, loading, error };
}