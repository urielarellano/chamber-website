import MonthlyCalendar from '@/components/calendars/MonthlyCalendar'
import WeeklyCalendar from '@/components/calendars/WeeklyCalendar'
import React from 'react'

export default function CalendarPage() {
  return (
    <div className="calendar-page">
      <h1>Events Calendars (Weekly and Monthly)</h1>
      <div className="line"></div>
      <div className="flex flex-col md:flex-col">
  {/* Weekly Calendar */}
  <div className="order-2 md:order-1 md:mt-0 mt-12!">
    <h2>Weekly Calendar</h2>
    <WeeklyCalendar />
  </div>

  {/* Monthly Calendar */}
  <div className="order-1 md:order-2 ">
    <h2>Monthly Calendar</h2>
    <MonthlyCalendar />
  </div>
</div>

      

    </div>
  )
}
