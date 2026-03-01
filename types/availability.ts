export type AvailabilityRule = {
  location_id: string;
  day_of_week: number; // 0 = Sunday, 6 = Saturday
  start_time: string;  // "HH:MM"
  end_time: string;    // "HH:MM"
};

export type AvailabilityException = {
  location_id: string;
  date: string;        // "YYYY-MM-DD"
  start_time: string;
  end_time: string;
  full_day_closed: boolean;
};

export type AvailabilityResponse = {
  location_id: string;
  rules: AvailabilityRule[];
  exceptions: AvailabilityException[];
};