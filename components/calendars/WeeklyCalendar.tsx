"use client";

import { useEffect, useState } from "react";

interface CalendarEvent {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  htmlLink: string;
}

interface WeeklyCalendarProps {
  calendarId?: string;
}

const DEFAULT_CALENDAR = "urielakc@gmail.com";

export default function WeeklyCalendar({
  calendarId = ``,
}: WeeklyCalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date())
  );

  useEffect(() => {
    fetchEvents();
  }, [currentWeekStart, calendarId]);

  async function fetchEvents() {
    try {
      setLoading(true);

      const timeMin = currentWeekStart.toISOString();
      const timeMax = addDays(currentWeekStart, 7).toISOString();
      let fetchString = ``;

      if (calendarId === '') {
        fetchString = `/api/calendar?timeMin=${timeMin}&timeMax=${timeMax}`;
      } else {
        fetchString = `/api/calendar?calendarId=${calendarId}&timeMin=${timeMin}&timeMax=${timeMax}`;
      }
      const res = await fetch(fetchString);
      
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();

      setEvents(Array.isArray(data.events) ? data.events : []);
    } catch (err) {
      console.error(err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  function nextWeek() {
    setCurrentWeekStart((prev) => addDays(prev, 7));
  }

  function prevWeek() {
    setCurrentWeekStart((prev) => addDays(prev, -7));
  }

  const days = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i)
  );

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <div className="flex justify-between! text-center items-center mb-4">
        <button onClick={prevWeek} className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 shadow-sm cursor-pointer">
          ←
        </button>

        <h2 className="text-md font-semibold text-center w-auto!">
          Week of {formatDate(currentWeekStart)}
        </h2>

        <button onClick={nextWeek} className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 shadow-sm cursor-pointer">
          →
        </button>
      </div>

      {loading && <div className="mb-3 text-sm">Loading...</div>}

      <div className="grid md:grid-cols-7 gap-2">
        {days.map((day) => {
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
            <div key={day.toISOString()} className="border bg-white p-2 md:min-h-[120px] min-h-[70px]">
              <div className="font-semibold mb-2">
                {day.toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "numeric",
                  day: "numeric",
                })}
              </div>

              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className="text-sm p-1 mb-1 bg-gray-100 hover:bg-gray-200 shadow-sm rounded px-1 mb-2 cursor-pointer"
                  onClick={() => window.open(event.htmlLink, "_blank")}
                >
                  {formatTime(event.start.dateTime)} <b>{event.summary}</b>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div className="md:hidden mt-6 flex justify-between! text-center items-center mb-4">
        <button onClick={prevWeek} className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 shadow-sm cursor-pointer">
          ←
        </button>

        <h2 className="text-md font-semibold text-center w-auto!">
          Week of {formatDate(currentWeekStart)}
        </h2>

        <button onClick={nextWeek} className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 shadow-sm cursor-pointer">
          →
        </button>
      </div>
    </div>
  );
}

//
// Helper Functions
//

function startOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 (Sun) - 6 (Sat)
  const diff = d.getDate() - day ; // Monday start
  return new Date(d.setDate(diff));
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function formatTime(dateString?: string) {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}