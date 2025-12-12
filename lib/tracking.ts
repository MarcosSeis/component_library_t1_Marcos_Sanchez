"use client";
import mitt from "mitt";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const trackingEmitter = mitt<{ tracked: void }>();

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

    if (res.ok) {
      trackingEmitter.emit("tracked");
    }
  } catch (err) {
    console.error("Track request error:", err);
  }
}
