import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// example path:
// http://localhost:3000/api/availability?location_id=98a53fdc-e33a-479c-96a2-3f63ce7cf729

// Supabase admin client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// TypeScript types
type AvailabilityRule = {
  location_id: string;
  day_of_week: number; // 0 = Sunday, 6 = Saturday
  start_time: string;  // "HH:MM"
  end_time: string;    // "HH:MM"
};

type AvailabilityException = {
  location_id: string;
  date: string;        // "YYYY-MM-DD"
  is_closed: boolean;
};


// GET /api/availability
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
  const locationId = searchParams.get("location_id");

  if (!locationId) {
    return NextResponse.json(
      { error: "location_id is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch rules
    const { data: rulesData, error: rulesError } = await supabase
      .from("availability_rules")
      .select("*")
      .eq("location_id", locationId);

    if (rulesError) throw rulesError;

    // Fetch exceptions
    const { data: exceptionsData, error: exceptionsError } = await supabase
      .from("availability_exceptions")
      .select("*")
      .eq("location_id", locationId);

    if (exceptionsError) throw exceptionsError;

    // Sort results
    const rules = (rulesData ?? []).sort((a, b) => a.day_of_week - b.day_of_week);
    const exceptions = (exceptionsData ?? []).sort((a, b) => a.date.localeCompare(b.date));

    // Return structured JSON
    return NextResponse.json({
      location_id: locationId,
      rules,
      exceptions,
    });
  } catch (error) {
    console.error("Failed to fetch availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}


