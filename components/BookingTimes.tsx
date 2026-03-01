"use client";

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isSameDay,
  getDay
} from "date-fns";
import BookForm from "./BookForm";
import { BookingInfo } from "@/types/booking";
import { useAvailability } from "@/hooks/checkAvailability";
import { AvailabilityException, AvailabilityRule } from "@/types/availability";
import { getAvailableHours, isDayAvailable } from "@/utils/availability";


const AVAILABLE_HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 8AM - 7PM

function formatHour(hour: number) {
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12} ${period}`;
}

export default function MonthCalendar({ location_id }: { location_id: string }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<number | null>(null);


  const startMonth = startOfMonth(currentMonth);
  const endMonth = endOfMonth(currentMonth);

  const startDate = startOfWeek(startMonth, { weekStartsOn: 0 });
  const endDate = endOfWeek(endMonth, { weekStartsOn: 0 });

  const totalDays = [];
  let day = startDate;
  while (day <= endDate) {
    totalDays.push(day);
    day = addDays(day, 1);
  }

  const { data, loading, error } = useAvailability(location_id);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data</p>;

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const initialValue: BookingInfo = {
    location_id: location_id,
    start_time: '2026-02-25T15:00:00Z', // e.g. 2026-02-25T15:00:00Z
    end_time: '',
    name: '',
    email: '',
    number: ''
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className='font-bold mb-4 bg-amber-100 inline-block'>Choose a Day:</h1>
      {/* Month Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="cursor-pointer px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          &lt;
        </button>
        <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
        <button
          onClick={handleNextMonth}
          className="cursor-pointer px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          &gt;
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-3 text-center mb-2 font-semibold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1 gap-x-3">
        {totalDays.map((day) => {
          const available = isDayAvailable(day, data.rules, data.exceptions);

          return available ? (
            <button
              key={day.toString()}
              onClick={() => setSelectedDate(day)}
              className={`pl-2 pr-2 cursor-pointer
                h-14 flex items-center justify-center rounded
                ${!isSameMonth(day, currentMonth) ? "text-gray-400" : "text-gray-800"}
                ${selectedDate && isSameDay(day, selectedDate) ? "bg-blue-400 text-white" : "hover:bg-blue-200"}
              `}
            >
              {format(day, "d")}
            </button>
          ) : (
            <div
              key={day.toString()}
              className={`pl-2 pr-2 h-14 flex items-center justify-center rounded text-gray-300`}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>

      {/* Times */}
      {selectedDate && (
        <div className="mt-6 max-w-xl">
          <h3 className="text-lg font-semibold mb-2">
            Selected Date: {format(selectedDate, "eeee, MMMM d, yyyy")}
          </h3>
          <p className="font-bold mb-4 bg-amber-100 inline-block">
            Choose a Start Time:</p>
          <div className="flex flex-wrap gap-2">
            {getAvailableHours(selectedDate, data.rules, data.exceptions).map((hour, index) =>
              hour !== 99 ? (
                <button
                  key={hour}
                  onClick={() => setSelectedTime(hour)}
                  className={`cursor-pointer px-4 py-2 border rounded transition-colors
                    ${selectedTime === hour ? "bg-blue-400 text-white" : "hover:bg-blue-200"}`}
                >
                  {formatHour(hour)}
                </button>
              ) : (
                <div key={`blocked-${index}`}
                  className={`px-4 py-2 border rounded transition-colors`}>
                  --
                </div>
              ) 
            )}
          </div>
        </div>
      )}

      {/* End Time (only show if a start time is selected) */}
    {selectedTime !== null && (
      <>
        <p className="font-bold mt-4 mb-2 bg-amber-100 inline-block">
          Choose an End Time:
        </p>
        <div className="flex flex-wrap gap-2">
          {(() => {
            if (selectedDate) {
              const hours = getAvailableHours(selectedDate, data.rules, data.exceptions);
              // Find end-time options: start from selectedTime
              const startIndex = hours.indexOf(selectedTime);
              const endOptions: number[] = [];

              for (let i = startIndex; i < hours.length; i++) {
                console.log('current index: ' + i);
                if (hours[i] === 99) {
                  endOptions.push(hours[i-1] + 1);
                  break; // stop at next blocked hour
                }
                if (i === hours.length - 1) { // add the ending hour
                  if (hours[i-1] !== 99) endOptions.push(hours[i]);
                  endOptions.push(hours[i] + 1);
                  break; 
                }
                
                if (hours[i] === selectedTime) continue;
                endOptions.push(hours[i]);
                
              }

              return endOptions.map((hour, index) => (
                <button
                  key={`end-${hour}-${index}`}
                  onClick={() => setSelectedEndTime(hour)}
                  className={`cursor-pointer px-4 py-2 border rounded transition-colors
                    ${selectedEndTime === hour ? "bg-blue-400 text-white" : "hover:bg-blue-200"}`}
                >
                  {formatHour(hour)}
                </button>
              ));
            }
          })()}
        </div>
      </>
    )}
      <br />

      {/* Selected Date AND Time */}
      
      {selectedTime && selectedDate && selectedEndTime && (
        <>
          <p className="font-bold mb-4 bg-amber-100 inline-block">
            Enter your info:</p>
          <BookForm
            initialValues={{
              ...initialValue,
              // Construct ISO string for startTime based on selected date + hour
              start_time: new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                selectedTime,
                0,
                0
              ).toISOString(),
              // For simplicity, endTime is 1 hour later
              end_time: new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                selectedEndTime,
                0,
                0
              ).toISOString(),
            }}
            onSubmit={(data) => {
              console.log("Form submitted:", data);
            }}
          />
        </>   
      )}
    </div>
  );
}