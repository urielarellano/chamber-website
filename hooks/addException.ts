// hooks/usePostException.ts
import { useState } from "react";

interface PostExceptionParams {
  location_id: string;
  date: string; // "YYYY-MM-DD"
  start_time?: string; // "HH:mm"
  end_time?: string;   // "HH:mm"
  full_day_closed: boolean;
}

export function usePostException() {
  const [loading, setLoading] = useState(false);
  const [exceptionError, setExceptionError] = useState<string | null>(null);
  const [exception, setException] = useState<any>(null);

  const postException = async (params: PostExceptionParams) => {
    setLoading(true);
    setExceptionError(null);

    try {
      const res = await fetch("/api/exceptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const data = await res.json();

      if (!res.ok) {
        setExceptionError(data.error || "Unknown error");
        return null;
      }

      setException(data.exception);
      return data.exception;
    } catch (err: any) {
      setExceptionError(err.message || "Network error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { postException, loading, exceptionError, exception };
}