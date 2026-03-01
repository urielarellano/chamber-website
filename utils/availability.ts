import { AvailabilityException, AvailabilityRule } from "@/types/availability";
import { getDay, format, startOfDay, isBefore } from "date-fns";

export function getAvailableHours(
  date: Date,
  rules: AvailabilityRule[],
  exceptions: AvailabilityException[]
): number[] {
  const dayOfWeek = getDay(date);
  const formattedDate = format(date, "yyyy-MM-dd");

  // Check exception first for full day closed
  const todaysExceptions = exceptions.filter((ex) => ex.date === formattedDate);
  if (todaysExceptions.some((ex) => ex.full_day_closed)) return [];

  // Find matching rule
  const rule = rules.find((r) => r.day_of_week === dayOfWeek);
  if (!rule) return []; // no rule = no hours

  // Parse start and end time strings (assume "HH:MM")
  const startHour = parseInt(rule.start_time.split(":")[0], 10);
  const endHour = parseInt(rule.end_time.split(":")[0], 10);

  // Build array of hours
  const hours = [];
  for (let h = startHour; h < endHour; h++) {
    // Check if this hour is blocked by any exception
    const blocked = todaysExceptions.some((ex) => {
      if (!ex.start_time || !ex.end_time) return false;

      //const exStartHour = parseInt(ex.start_time, 10);
      //const exEndHour = parseInt(ex.end_time, 10);

      // ❗❗ This subtracts 6 from the time excetion
      // ❗❗ because supabase stores stuff 6 hours ahead
      // ❗❗ because of utc conversion stuff
      const timeZoneOffset = 6; // hours to subtract

      let exStartHour = parseInt(ex.start_time.split(":")[0], 10) - timeZoneOffset;
      let exEndHour = parseInt(ex.end_time.split(":")[0], 10) - timeZoneOffset;

      // Handle negative hours (wrap around midnight)
      exStartHour = exStartHour < 0 ? exStartHour + 24 : exStartHour;
      exEndHour = exEndHour < 0 ? exEndHour + 24 : exEndHour;

      return h >= exStartHour && h < exEndHour;
    });

    hours.push(blocked ? 99 : h);
  }

  return hours;
}

export function isDayAvailable(
  date: Date,
  rules: AvailabilityRule[],
  exceptions: AvailabilityException[]
): boolean {
  const today = startOfDay(new Date()); // today at 00:00
  const checkDate = startOfDay(date);   // the date being checked at 00:00

  // If the date is in the past, not available
  if (isBefore(checkDate, today)) return false;

  const dayOfWeek = getDay(date); // 0 = Sunday, 6 = Saturday
  const formattedDate = format(date, "yyyy-MM-dd");

  // Check exceptions first (specific dates)
  // ❗❗❗ must check if exceptions fill up available times of that day
  const exception = exceptions.find((ex) => ex.date === formattedDate);
  if (exception) {
    return !exception.full_day_closed; // closed = not available
  }

  // Check weekly rules
  const rule = rules.find((r) => r.day_of_week === dayOfWeek);
  if (!rule) return false; // no rule = not available

  return true;
}