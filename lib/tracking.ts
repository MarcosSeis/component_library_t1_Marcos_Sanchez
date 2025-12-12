interface TrackEventProps {
  component: string;
  action: string;
  variant?: string;
  type?: string;
  value?: string;
  timestamp: number;
}

let listeners: ((event: TrackEventProps) => void)[] = [];

// Local dispatch (demo realtime dashboard)
export const trackEvent = async (event: TrackEventProps) => {
  // notify dashboard listeners
  listeners.forEach((l) => l(event));

  // send to backend mock
  try {
    await fetch("/api/components/track", {
      method: "POST",
      body: JSON.stringify(event),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.warn("Tracking API unreachable (mock). Event stored locally only.");
  }
};

export const subscribeToTracking = (cb: (event: TrackEventProps) => void) => {
  listeners.push(cb);
};
