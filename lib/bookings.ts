import { BookingInfo } from '@/types/booking';

export async function submitBooking(formData: BookingInfo) {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to submit booking');
  return data.booking;
}