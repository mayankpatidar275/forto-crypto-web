"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type EventItem = {
  id: string;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  totalCoins?: number;
  // optional fallback image
  imageUrl?: string;
  brandId?: string;
};

export default function EventsCarousel() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/api/v1/events");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const payload = await res.json();
        // try common shapes: { success: true, data: [...] } or [...]
        const data = payload?.data ?? payload;
        if (mounted) setEvents(Array.isArray(data) ? data : []);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.error("EventsCarousel error", e);
        if (mounted) {
          setErr("Unable to load events");
          setEvents([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="cp-x cp-y my-8">
        <div className="max-w-6xl mx-auto text-center">Loading events…</div>
      </section>
    );
  }

  if (err || !events || events.length === 0) {
    return (
      <section className="cp-x cp-y my-8">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          No active events right now.
        </div>
      </section>
    );
  }

  return (
    <section className="cp-x cp-y my-8">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-6">
          Live & Upcoming Draws
        </h3>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {events.map((ev) => (
            <article
              key={ev.id}
              className="flex-none w-80 snap-center bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden"
            >
              <div className="relative aspect-video bg-slate-100">
                {/* if you have event.imageUrl use it, else show simple placeholder */}
                {ev.imageUrl ? (
                  <Image
                    src={ev.imageUrl}
                    alt={ev.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-sm text-gray-500">
                    No image
                  </div>
                )}
              </div>

              <div className="p-4">
                <h4 className="font-semibold text-lg line-clamp-2">
                  {ev.name}
                </h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {ev.description ??
                    `${ev.status ?? ""} • Coins: ${ev.totalCoins ?? 0}`}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {ev.startDate
                      ? new Date(ev.startDate).toLocaleDateString()
                      : ""}
                    {ev.endDate
                      ? ` — ${new Date(ev.endDate).toLocaleDateString()}`
                      : ""}
                  </div>

                  {/* link to event page (you can change route shape later) */}
                  <Link
                    href={`/events/${ev.id}`}
                    className="inline-block px-3 py-1 rounded-full border border-transparent bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm shadow-sm hover:opacity-95"
                  >
                    View Draws
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
