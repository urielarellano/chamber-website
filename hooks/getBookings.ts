import { ReceivedBooking } from '@/types/booking';

export const getBookings = async (): Promise<ReceivedBooking[]> => {
  const res = await fetch('/api/bookings');
  const data = await res.json();

  if (!data.success) throw new Error('Failed to fetch bookings');

  // Convert date strings to Date objects
  return data.bookings.map((b: any) => ({
    ...b,
    start_time: new Date(b.start_time),
    end_time: new Date(b.end_time),
    created_at: new Date(b.created_at)
  })) as ReceivedBooking[];
};
