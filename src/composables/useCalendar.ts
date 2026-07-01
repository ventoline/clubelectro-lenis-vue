/**
 * useCalendar.ts
 * Fetches upcoming events from a public Google Calendar via the REST API.
 *
 * Setup:
 *  1. In Google Cloud Console, enable the Calendar API and create an API key
 *  2. In Google Calendar settings, make your calendar public
 *  3. Add to .env:
 *       VITE_GCAL_API_KEY=your_key
 *       VITE_GCAL_CALENDAR_ID=your_calendar_id@group.calendar.google.com
 *
 * Ticket URL convention:
 *  Put the ticket URL as the first line of an event's description in Google Calendar.
 *  It will be parsed out and attached to the "Get tickets" button.
 */
import { ref, onMounted } from "vue";

export interface CalEvent {
  id: string;
  title: string;
  date: Date;
  dateLabel: string; // pre-formatted "Sat 12 Jul"
  timeLabel: string; // pre-formatted "21:00"
  location: string;
  ticketUrl: string | null;
}

const API_KEY = import.meta.env.VITE_GCAL_API_KEY as string;
const CALENDAR_ID = import.meta.env.VITE_GCAL_CALENDAR_ID as string;

function parseTicketUrl(description: string | undefined): string | null {
  if (!description) return null;
  const first = description.split(/\n|<br>/)[0].trim();
  try {
    new URL(first);
    return first;
  } catch {
    return null;
  }
}

function formatDate(d: Date): string {
  const y   = d.getFullYear()
  const m   = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}/${m}/${day}`
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export function useCalendar() {
  const events = ref<CalEvent[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  onMounted(async () => {
    if (!API_KEY || !CALENDAR_ID || API_KEY === "YOUR_API_KEY_HERE") {
      error.value = "Google Calendar API key or Calendar ID not set.";
      loading.value = false;
      return;
    }

    try {
      const now = new Date().toISOString();
      const maxItems = 20;
      const url = [
        `https://www.googleapis.com/calendar/v3/calendars/`,
        encodeURIComponent(CALENDAR_ID),
        `/events?key=${API_KEY}`,
        `&timeMin=${now}`,
        `&maxResults=${maxItems}`,
        `&singleEvents=true`,
        `&orderBy=startTime`,
        `&fields=items(id,summary,description,location,start)`,
      ].join("");

      const res = await fetch(url);
      if (!res.ok)
        throw new Error(`Calendar API error ${res.status}: ${res.statusText}`);
      const data = await res.json();

      events.value = (data.items ?? []).map((item: any): CalEvent => {
        const raw = item.start?.dateTime ?? item.start?.date;
        const date = new Date(raw);
        return {
          id: item.id,
          title: item.summary ?? "lce event",
          date,
          dateLabel: formatDate(date),
          timeLabel: item.start?.dateTime ? formatTime(date) : "All day",
          location: item.location ?? "",
          ticketUrl: parseTicketUrl(item.description),
        };
      });
    } catch (e: any) {
      error.value = e.message ?? "Failed to load events";
    } finally {
      loading.value = false;
    }
  });

  return { events, loading, error }
}
