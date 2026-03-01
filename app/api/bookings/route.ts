import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { supabaseServer } from '@/lib/supabaseServer';

// POST a new booking request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { location_id, start_time, end_time, name, email, number } = body;

    if (!location_id || !start_time || !end_time || !name || !email || !number) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Insert booking as 'pending'
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          location_id: location_id,
          start_time: start_time,
          end_time: end_time,
          name,
          email,
          number,
          status: 'pending'
        }
      ])
      .select();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, booking: data[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET booking requests
export async function GET(req: NextRequest) {
  try {
    // Optionally, you could filter or order bookings
    const { data, error } = await supabase
      .from('bookings')
      .select('*')  // select all columns
      .order('start_time', { ascending: true }); // optional: order by start_time

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, bookings: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


// DELETE a booking request
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}