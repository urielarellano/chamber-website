import { AvailabilityException, AvailabilityResponse, AvailabilityRule } from "@/types/availability";
import { useState, useEffect } from "react";

// returns rules and exceptions array-- 
// days available and times available during those days
export function useAvailability(locationId: string) {
  const [data, setData] = useState<AvailabilityResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!locationId) return;

    setLoading(true);
    fetch(`/api/availability?location_id=${locationId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch availability");
        return res.json();
      })
      .then((json: AvailabilityResponse) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [locationId]);

  return { data, loading, error };
}