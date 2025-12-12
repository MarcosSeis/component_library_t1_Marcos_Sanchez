"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function trackEvent(data: {
  component: string;
  action: string;
  variant?: string;
  timestamp?: number;
}) {
  try {
    const res = await fetch(`${API_URL}/components/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        timestamp: data.timestamp ?? Date.now(),
      }),
    });

    if (!res.ok) {
      console.error("Track event failed");
    }
  } catch (err) {
    console.error("Track request error:", err);
  }
}

export function subscribeToTracking(callback: (count: number) => void) {

  let interval = setInterval(async () => {
    try {
      const res = await fetch(`${API_URL}/components/stats`);
      const json = await res.json();
      callback(json.total || 0);
    } catch (e) {
      console.error("Error fetching stats");
    }
  }, 1500);

  return () => clearInterval(interval);
}
