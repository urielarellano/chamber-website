import { supabaseServer } from "@/lib/supabaseServer";
import { NextRequest, NextResponse } from "next/server";

// POST exception rule
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { location_id, date, start_time, end_time, full_day_closed } = body;

    if (!location_id || !date) {
      return NextResponse.json(
        { error: "location_id and date are required" },
        { status: 400 }
      );
    }

    // If full-day closed, ignore times
    const insertData = {
      location_id,
      date, // must be YYYY-MM-DD
      full_day_closed: full_day_closed ?? false,
      start_time: full_day_closed ? null : start_time ?? null,
      end_time: full_day_closed ? null : end_time ?? null,
    };

    const { data, error } = await supabaseServer
      .from("availability_exceptions")
      .insert([insertData])
      .select();

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, exception: data[0] });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}