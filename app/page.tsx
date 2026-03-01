'use client'

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { BookingInfo } from '@/types/booking';
import BookForm from "@/components/BookForm";
import BookingTimes from "@/components/BookingTimes";
import WeeklyCalendar from "@/components/calendars/WeeklyCalendar";
import MonthlyCalendar from "@/components/calendars/MonthlyCalendar";

import mendotaSign from '@/public/mendota-sign.jpg';
import giftCertificate from '@/public/chamber-gift-certificate.jpg';

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);

  const handleScriptLoad = () => {
    // Tell TypeScript that window.calendar exists
    const win = window as any; 

    if (win.calendar && targetRef.current) {
      win.calendar.schedulingButton.load({
        url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2UL5wYhcQSGE9v2_azCGP-Gp8WQzjynoz1ZhJadzt7QuheHBb27MVHBk4XRMBkZ8leOGS-XoKd?gv=true",
        color: "#039BE5",
        label: "Book an appointment",
        target: targetRef.current,
      });
    }
  };


  return (
    <div className="page bg-gray-100">
      <Image
        src={mendotaSign}
        alt='mendota sign'
        className='md:w-[55%] w-full h-auto shadow-md'
      />
      <h1 className="mb-0!">Find Everything You Need To Know About Mendota, Illinois!</h1>
      <h3>Here you'll find all Mendota events, businesses, Chamber members and more.</h3>
      <div className="line"></div>
      <h2>Upcoming Mendota Events</h2>
      <WeeklyCalendar></WeeklyCalendar>

      <div className="line"></div>
      <h2> Welcome to Mendota, Illinois!</h2>
      <p>The Mendota Area Chamber of Commerce, established in 1945, is a not-for-profit organization of businesses representing industry, retail, service, professionals, and agriculture in partnership with tourism and government to further promote economic growth and quality of life in Mendota. The strength of the Chamber lies in the active involvement of its membership. Both large and small businesses are represented and influence the direction of the organization.</p>
      <Link href="/about/about-us">Learn More...</Link>

      <div className="line"></div>
      <h2>Gift Certificates</h2>
      <Image
        src={giftCertificate}
        alt='gift certificates'
        className='md:w-[90%] w-full h-auto shadow-md'
      />
      

      
      {/* Google Calendar button <>
        <link
          rel="stylesheet"
          href="https://calendar.google.com/calendar/scheduling-button-script.css"
        />
        <Script
          src="https://calendar.google.com/calendar/scheduling-button-script.js"
          strategy="afterInteractive"
          onLoad={handleScriptLoad} // Wait until the script loads
        />
        <div ref={targetRef}></div>
      </> */}
    </div>
  );
}
