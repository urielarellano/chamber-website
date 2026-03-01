import { useState } from 'react';
import { submitBooking as submitBookingAPI } from '@/lib/bookings';
import { BookingInfo } from '@/types/booking';

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitBooking(formData: BookingInfo) {
    setLoading(true);
    setError(null);
    try {
      const booking = await submitBookingAPI(formData);
      setLoading(false);
      return booking;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }

  return { submitBooking, loading, error };
}