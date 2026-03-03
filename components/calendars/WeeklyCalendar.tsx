"use client";

import { useEffect, useState } from "react";

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  htmlLink: string;
  organizer?: { displayName?: string; email?: string };
  calendarName: string;
}

interface WeeklyCalendarProps {
  calendarId?: string;
}

const DEFAULT_CALENDAR = "urielakc@gmail.com";

export default function WeeklyCalendar({
  
}: WeeklyCalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [calendarId, setCalendarId] = useState<string>('');
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date())
  );

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
    <>
      <span>(hover or click event to see details)</span>
      {/* filter buttons */}
      <div className="flex flex-row flex-wrap gap-3 mb-4"> 
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
      <div className="weekly-calendar">
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
                    className={`weekly-event ${event.calendarName} md:mr-0 mr-1`}
                  >
                    {formatTime(event.start.dateTime)} <b>{event.summary}</b>
                    <div className="hover-content">
                      <b>{event.summary}</b>
                      {event.location && (
                        <div>
                          <b>Location:</b> {event.location}
                        </div>
                      )}
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
    </>
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

function hasHtml(str?: string) {
  if (!str) return false;
  return /<[^>]+>/g.test(str);
}