"use client";

import { useEffect, useState } from "react";

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  htmlLink: string;
  organizer?: { displayName?: string; email?: string };
  calendarName: string;
}

interface MonthlyCalendarProps {
  calendarId?: string;
}

const DEFAULT_CALENDAR = "urielakc@gmail.com";

export default function MonthlyCalendar({
}: MonthlyCalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [calendarName, setCalendarName] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarId, setCalendarId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const calendars = [
    { name: 'All Calendars', calendar_id: '', className: 'MainCalendar' },
    { name: 'Main Calendar', calendar_id: 'maccceopiller@gmail.com', className: 'MainCalendar' },
    { name: '21+ Events', calendar_id: 'f5ac7e1a393e7344e9b7ac6c1c98b170e4af9e1fdd8fd5adf2332efe9721280c@group.calendar.google.com', className: 'twentyone-plus' },
    { name: '5–8 Events', calendar_id: '4241f107b32fa4c5170322c1a15497578fc0101d3f9e92329efdfe3850cf6c83@group.calendar.google.com', className: 'five-eight' },
    { name: '5–8 Graders', calendar_id: '0df4fe9a5a8db1bdcc8310b51c78d6ac37a981478274bd072f3783363f2cfc23@group.calendar.google.com', className: 'five-eight-graders' },
    { name: '9–12 Events', calendar_id: '163fcd3f2bb70b30b222e37d4f8228986db849e3965b467b8ad2933480197bd6@group.calendar.google.com', className: 'nine-twelve' },
    { name: 'Family Events', calendar_id: '184c1d1eb3ebef4741b19c214329e93e181ec2427d09a0df958f571ee2b21242@group.calendar.google.com', className: 'family' },
    { name: 'K–4 Events', calendar_id: '5d1a5dd40ecb1604844a842a2ab0890de67e3f1076f2618e9dae10426a842049@group.calendar.google.com', className: 'k-four' },
    { name: 'Seniors', calendar_id: '871d1ddc6af395b4ced93bc1084fc2bdbf05c4ac759c57a16920182f10bad57b@group.calendar.google.com', className: 'seniors' },
    { name: 'Mendota City', calendar_id: 'mendotacity12224@gmail.com', className: 'mendota-city' },
    { name: 'Public Events', calendar_id: '1a7rp43j0paai1jhmrqpg9qmemmj9jcc@import.calendar.google.com', className: 'public-events' },
    { name: 'Holidays', calendar_id: 'en.usa#holiday@group.v.calendar.google.com', className: 'holidays' }
  ];

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
    <>
      <span>(hover or click event to see details)</span>
      {/* filter buttons */}
      <div className="flex flex-row flex-wrap gap-3 mb-4 mt-4"> 
        {calendars.map((calendar) => (
          <div
            key={calendar.calendar_id}
            className={`
              ${calendar.className} 
              cursor-pointer px-2 py-1 rounded-xl shadow-sm border text-center hover:opacity-100
              ${calendarId === calendar.calendar_id ? 'border-2 shadow-md' : 'opacity-45 '}
            `}
            onClick={() => setCalendarId(calendar.calendar_id)}
          >
            {calendar.name}
          </div>
        ))}
      </div>
    
      <div className="monthly-calendar">
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
        <div className="calendar-days ">
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
                    className={`event-item monthly-event ${calendarClass} ${event.calendarName}`}
                  >
                    {formatTime(event.start.dateTime)} <b>{event.summary}</b>
                    <div className="hover-content">
                      <b>{event.summary}</b>
                      {event.description && !hasHtml(event.description) && (
                        <div className='overflow-y-auto'>{event.description}</div>
                      )}
                      <span><b>Start:</b> {formatTime(event.start.dateTime) || event.start.date}</span>
                      <span><b>End:</b> {formatTime(event.end.dateTime) || event.end.date}</span>
                      {event.organizer?.displayName && (
                        <div>
                          <b>Organizer:</b> {event.organizer.displayName}
                        </div>
                      )}
                      <div className="text-blue-500 underline cursor-pointer"
                        onClick={() => window.open(event.htmlLink, "_blank")}>
                          Open in Google Calendar
                      </div>
                    </div>
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
    </>
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

function hasHtml(str?: string) {
  if (!str) return false;
  return /<[^>]+>/g.test(str);
}