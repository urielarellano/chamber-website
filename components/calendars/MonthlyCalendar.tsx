"use client";

import { useEffect, useState } from "react";

interface CalendarEvent {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  htmlLink: string;
}

interface MonthlyCalendarProps {
  calendarId?: string;
}

const DEFAULT_CALENDAR = "urielakc@gmail.com";

export default function MonthlyCalendar({
  calendarId = ``,
}: MonthlyCalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [calendarName, setCalendarName] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // Fetch events when month or calendarId changes
  useEffect(() => {
    fetchEvents();
  }, [currentMonth, calendarId]);

  async function fetchEvents() {
    try {
      setLoading(true);

      const firstDay = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        1
      );
      const lastDay = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0,
        23,
        59,
        59
      );
      let fetchString = ``;

      if (calendarId === '') {
        fetchString = `/api/calendar?timeMin=${firstDay.toISOString()}&timeMax=${lastDay.toISOString()}`;
      } else {
        fetchString = `/api/calendar?calendarId=${calendarId}&timeMin=${firstDay.toISOString()}&timeMax=${lastDay.toISOString()}`;
      }
      const res = await fetch(fetchString);

      if (!res.ok) throw new Error("Failed fetch");

      const data = await res.json();
      setEvents(Array.isArray(data.events) ? data.events : []);
      setCalendarName(typeof data.calendarName === "string" ? data.calendarName : "");
    } catch (err) {
      console.error(err);
      setEvents([]);
      setCalendarName("");
    } finally {
      setLoading(false);
    }
  }

  function nextMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  }

  function prevMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  }

  const monthDays = generateMonthGrid(currentMonth);
  const calendarClass = slugify(calendarName);

  return (
    <div className="md:p-4 pt-4 pb-4 border bg-gray-50 rounded-lg md:w-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 shadow-sm cursor-pointer">
          ←
        </button>

        <h2 className="text-xl font-semibold text-center w-auto!">
          {currentMonth.toLocaleDateString(undefined, {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button onClick={nextMonth} className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 shadow-sm cursor-pointer">
          →
        </button>
      </div>

      {loading && <div className="mb-3 text-sm">Loading...</div>}

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 text-center font-semibold mb-2 sticky md:top-0 top-[9vh] w-full bg-gray-50 md-p-0 p-5 pt-2 pb-2 md-gap-0 gap-8 w-fit z-10">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 md:gap-1 gap-0">
        {monthDays.map((day, index) => {
          const isFirstDay = index === 0;
          const startColumn = day.getDay() + 1; // grid columns are 1-based
          const dayEvents = events.filter((event) => {
            if (!event.start) return false;

            let eventDate: Date;

            if (event.start.dateTime) {
              eventDate = new Date(event.start.dateTime);
            } else if (event.start.date) {
              const [year, month, dayNum] = event.start.date.split("-").map(Number);
              eventDate = new Date(year, month - 1, dayNum);
            } else {
              return false;
            }

            return isSameDay(eventDate, day);
          });

          return (
            <div
              key={index}
              style={isFirstDay ? { gridColumnStart: startColumn } : undefined}
              className="border min-h-[100px] p-1 text-sm bg-white"
            >
              <div className="font-semibold text-xs mb-1">{day.getDate()}</div>

              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className={`event-item ${calendarClass} bg-gray-100 hover:bg-gray-200 shadow-sm rounded md:px-1 px-0! mb-2 cursor-pointer md:text-[13px] text-[11px]`}
                  onClick={() => window.open(event.htmlLink, "_blank")}
                >
                  {formatTime(event.start.dateTime)} <b>{event.summary}</b>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <br />
      <div className="flex justify-between items-center">
        <button onClick={prevMonth} className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 shadow-sm cursor-pointer">
          ←
        </button>

        <h2 className="text-xl font-semibold text-center w-auto!">
          {currentMonth.toLocaleDateString(undefined, {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button onClick={nextMonth} className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 shadow-sm cursor-pointer">
          →
        </button>
      </div>
    </div>
  );
}

//
// Helper functions
//

// Get the Sunday of the week for a given date
function getSunday(date: Date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

// Check if two dates are the same day
function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

// Generate month grid, weeks starting on Sunday, only include days within current month
function generateMonthGrid(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const lastDay = new Date(year, month + 1, 0).getDate();

  const days: Date[] = [];

  for (let i = 1; i <= lastDay; i++) {
    days.push(new Date(year, month, i));
  }

  return days;
}

// Slugify calendar name for class names
function slugify(text?: string) {
  return (text || "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

function formatTime(dateString?: string) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}