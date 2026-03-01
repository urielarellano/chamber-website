"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getBookings } from "@/hooks/getBookings";
import { ReceivedBooking } from "@/types/booking";
import { deleteBooking } from "@/hooks/deleteBooking";
import { usePostException } from "@/hooks/addException";

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [bookings, setBookings] = useState<ReceivedBooking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { postException, loading, exceptionError, exception } = usePostException();

  // Listen to auth changes ONCE
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    init();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Load bookings ONLY if logged in
  useEffect(() => {
    if (!user) return;

    const loadBookings = async () => {
      try {
        setLoadingBookings(true);
        const data = await getBookings();
        setBookings(data);
      } catch (err: any) {
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoadingBookings(false);
      }
    };

    loadBookings();
  }, [user]);

  const handleLogin = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
      await supabase.auth.signOut();
      setBookings([]); // optional: clear bookings immediately
  };

  // handle deleting a booking
  const handleDelete = async (id: string) => {
    try {
      await deleteBooking(id); // call your hook
      // remove from state to trigger re-render
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      alert("Failed to delete booking: " + err.message);
    }
  };

  // handle approve booking
  const handleApprove = async (booking: ReceivedBooking) => {
    handleDelete(booking.id);

    // delete other bookings whose times intersect with approved booking
    for (const booking of bookings) {// loop through bookings
      if (booking.end_time > booking.start_time && booking.start_time < booking.end_time) {
        handleDelete(booking.id);
      }
    }

    // create an exception in exceptions table for the approved booking
    await postException({
      location_id: booking.location_id,
      date: booking.start_time.toISOString().split("T")[0],
      start_time: booking.start_time.toISOString().split("T")[1],
      end_time: booking.end_time.toISOString().split("T")[1],
      full_day_closed: false
    });

    // create event in Google calendar for approved booking
    await fetch("/api/calendar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        summary: "Luigi Spaghetti",
        description: "Client booking",
        start: booking.start_time.toISOString(),
        end: booking.end_time.toISOString(),
      }),
    });
  }

  // Not logged in
  if (!user) {
    return (
      <div className="page bg-stone-100 h-[90vh]">
        <h1 className="font-bold text-xl">Admin Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="bg-white flex flex-col gap-4 w-80 p-6 border rounded-lg shadow"
        >
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit"
            className="bg-black text-white p-2 rounded"
          > Login
          </button>
        </form>
      </div>
    );
  }

  // Logged in
  return (
    <div className="page bg-gray-100 p-6">
      <h1 className="text-xl font-bold mb-4">
        Pending Booking Requests
      </h1>
      <button onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      > Logout
      </button>

      {loadingBookings && <p>Loading bookings...</p>}

      <ul>
        {bookings.map((b) => (
          <li key={b.id}>
            {b.name} –{" "}
            {new Date(b.start_time).toLocaleString()} to{" "}
            {new Date(b.end_time).toLocaleString()} –{" "}
            {b.status}
            <div className="flex flex-row gap-2">
              <div className="p-2 rounded bg-gray-300 text-green-400 cursor-pointer"
                onClick={() => handleApprove(b)}>
                &#10003;</div>
              <div className="p-2 rounded bg-gray-300 text-red-400 cursor-pointer"
                onClick={() => handleDelete(b.id)}>
                &#9747;</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}