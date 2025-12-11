interface TrackEventProps {
  component: string;
  action: string;
  variant?: string;
  timestamp: number;
}

let listeners: ((event: TrackEventProps) => void)[] = [];

export const trackEvent = (event: TrackEventProps) => {
  listeners.forEach((l) => l(event));
};

export const subscribeToTracking = (cb: (event: TrackEventProps) => void) => {
  listeners.push(cb);
};
