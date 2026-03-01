// components/BookingForm.tsx
"use client";

import { submitBooking } from "@/lib/bookings";
import { BookingInfo } from "@/types/booking";
import { useEffect, useState } from "react";

interface BookingFormProps {
  initialValues?: BookingInfo;
  onSubmit: (data: BookingInfo) => void;
}

export default function BookForm({ initialValues, onSubmit }: BookingFormProps) {
  const [form, setForm] = useState<BookingInfo>({
    location_id: initialValues?.location_id || "",
    start_time: initialValues?.start_time || "",
    end_time: initialValues?.end_time || "",
    name: initialValues?.name || "",
    email: initialValues?.email || "",
    number: initialValues?.number || "",
  });

    useEffect(() => {
        setForm({
            location_id: initialValues?.location_id || "",
            start_time: initialValues?.start_time || "",
            end_time: initialValues?.end_time || "",
            name: initialValues?.name || "",
            email: initialValues?.email || "",
            number: initialValues?.number || "",
        });
    }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const booking = await submitBooking(form);
        alert('Booking submitted!');
    } catch (err) {
        console.error(err);
    }
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg max-w-md mx-auto">
    <div>
        <label htmlFor="name" className="block mb-1 font-medium">Name<span className="text-red-500">*</span></label>
        <input
        type="text"
        id="name"
        name="name"
        placeholder="John Doe"
        value={form.name}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
        />
    </div>

    <div>
        <label htmlFor="email" className="block mb-1 font-medium">Email<span className="text-red-500">*</span></label>
        <input
        type="email"
        id="email"
        name="email"
        placeholder="john@example.com"
        value={form.email}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
        />
    </div>

    <div>
        <label htmlFor="number" className="block mb-1 font-medium">Phone Number<span className="text-red-500">*</span></label>
        <input
        type="tel"
        id="number"
        name="number"
        placeholder="999-999-9999"
        value={form.number}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
        />
    </div>

    <div>
        <label htmlFor="startTime" className="block mb-1 font-medium">Start Time<span className="text-red-500">*</span></label>
        <input
        type="datetime-local"
        id="startTime"
        name="startTime"
        value={
            form.start_time
            ? new Date(form.start_time)
                .toLocaleString("sv-SE", { hour12: false })
                .replace(" ", "T")
                .slice(0, 16)
            : ""
        }
        readOnly
        className="w-full border px-3 py-2 rounded"
        required
        />
    </div>

    <div>
        <label htmlFor="endTime" className="block mb-1 font-medium">End Time<span className="text-red-500">*</span></label>
        <input
        type="datetime-local"
        id="endTime"
        name="endTime"
        value={
            form.end_time
            ? new Date(form.end_time)
                .toLocaleString("sv-SE", { hour12: false })
                .replace(" ", "T")
                .slice(0, 16)
            : ""
        }
        readOnly
        className="w-full border px-3 py-2 rounded"
        required
        />
    </div>

    

    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        Request Booking
    </button>
    </form>
  );
}