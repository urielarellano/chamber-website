import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// 1. Move Auth outside the GET function to reuse the instance
const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
});

const calendarClient = google.calendar({ version: "v3", auth });

// 2. Static Map: Saves you 11 API calls per request
const CALENDAR_CONFIG: Record<string, string> = {
  "maccceopiller@gmail.com": "MainCalendar",
  "f5ac7e1a393e7344e9b7ac6c1c98b170e4af9e1fdd8fd5adf2332efe9721280c@group.calendar.google.com": "twentyone-plus",
  "4241f107b32fa4c5170322c1a15497578fc0101d3f9e92329efdfe3850cf6c83@group.calendar.google.com": "five-eight",
  "0df4fe9a5a8db1bdcc8310b51c78d6ac37a981478274bd072f3783363f2cfc23@group.calendar.google.com": "five-eight-graders",
  "163fcd3f2bb70b30b222e37d4f8228986db849e3965b467b8ad2933480197bd6@group.calendar.google.com": "nine-twelve",
  "184c1d1eb3ebef4741b19c214329e93e181ec2427d09a0df958f571ee2b21242@group.calendar.google.com": "family",
  "5d1a5dd40ecb1604844a842a2ab0890de67e3f1076f2618e9dae10426a842049@group.calendar.google.com": "k-four",
  "871d1ddc6af395b4ced93bc1084fc2bdbf05c4ac759c57a16920182f10bad57b@group.calendar.google.com": "seniors",
  "mendotacity12224@gmail.com": "mendota-city",
  "1a7rp43j0paai1jhmrqpg9qmemmj9jcc@import.calendar.google.com": "public-events",
  "en.usa#holiday@group.v.calendar.google.com": "holidays",
};

const CALENDAR_IDS = Object.keys(CALENDAR_CONFIG);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const calendarIdParam = searchParams.get("calendarId");
  const timeMin = searchParams.get("timeMin") || undefined;
  const timeMax = searchParams.get("timeMax") || undefined;

  try {
    // Determine which IDs to fetch
    const targetIds = calendarIdParam ? [calendarIdParam] : CALENDAR_IDS;

    const allEventsResults = await Promise.all(
      targetIds.map(async (id) => {
        try {
          const response = await calendarClient.events.list({
            calendarId: id,
            timeMin,
            timeMax,
            singleEvents: true,
            orderBy: "startTime",
            // Keep organizer if you need it, it's not the bottleneck
            fields: "items(id,summary,description,start,end,htmlLink,organizer)",
          });

          return (response.data.items || []).map((event) => ({
            ...event,
            calendarId: id,
            calendarName: CALENDAR_CONFIG[id] || "Unknown Calendar",
          }));
        } catch (err) {
          console.error(`Error fetching calendar ${id}:`, err);
          return []; // Skip failing calendars instead of crashing the whole request
        }
      })
    );

    const mergedEvents = allEventsResults
      .flat()
      .sort((a, b) => {
        const aStart = new Date(a.start?.dateTime || a.start?.date || "").getTime();
        const bStart = new Date(b.start?.dateTime || b.start?.date || "").getTime();
        return aStart - bStart;
      });

    return NextResponse.json(
      {
        // If single calendar requested, follow your original structure
        calendarName: calendarIdParam ? CALENDAR_CONFIG[calendarIdParam] : "All Calendars",
        events: mergedEvents,
      },
      {
        headers: {
          // Tell the browser/edge to cache this for 60 seconds
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error("Google Calendar fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);

//   const calendarId = searchParams.get("calendarId");
//   const timeMin = searchParams.get("timeMin");
//   const timeMax = searchParams.get("timeMax");

//   if (!calendarId) {
//     return NextResponse.json(
//       { error: "calendarId required" },
//       { status: 400 }
//     );
//   }

// try {
//   const auth = new google.auth.GoogleAuth({
//     keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
//     scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
//   });
//   // const auth = new google.auth.JWT({
//   //   email: process.env.GOOGLE_CLIENT_EMAIL,
//   //   key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//   //   scopes: ["https://www.googleapis.com/auth/calendar"],
//   // });

//   const calendar = google.calendar({ version: "v3", auth });
  
//   const calendarInfo = await calendar.calendars.get({
//     calendarId,
//   });

//   // maccceopiller@gmail.com
//   const events = await calendar.events.list({
//     calendarId: calendarId,
//     timeMin: timeMin || undefined,
//     timeMax: timeMax || undefined,
//     singleEvents: true,
//     orderBy: "startTime",
//     fields: "items(id,summary,description,start,end,htmlLink,colorId,organizer)",
//   });

//   return NextResponse.json({
//     calendarName: calendarInfo.data.summary,
//     events: events.data.items || [],
//   });
//   } catch (error) {
//     console.error("Google Calendar fetch error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch events" },
//       { status: 500 }
//     );
//   }
// }



// post Google calendar event
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { summary, description, start, end } = body;

    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    const event = await calendar.events.insert({
      calendarId: "urielakc@gmail.com", // or specific email
      requestBody: {
        summary,
        description,
        start: {
          dateTime: start,   // ISO string
          timeZone: "America/Chicago",
        },
        end: {
          dateTime: end,     // ISO string
          timeZone: "America/Chicago",
        },
      },
    });

    return NextResponse.json(event.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}