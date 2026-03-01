export type BookingInfo = {
  location_id: string;
  start_time: string; // ISO string, e.g., "2026-02-25T15:00:00Z"
  end_time: string;   // ISO string
  name: string;
  email: string;
  number: string;
};

export type ReceivedBooking = {
  id: string;
  location_id: string;
  start_time: Date;
  end_time: Date;
  name: string;
  email: string;
  number: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: Date;      // was created_at
};

// example
/* 
const formValues: BookingInfo = {
  locationId: 'uuid-of-civic-center',
  startTime: '2026-02-25T15:00:00Z',
  endTime: '2026-02-25T16:00:00Z',
  name: 'John Doe',
  email: 'john@example.com',
  number: '9999999999'
};
*/