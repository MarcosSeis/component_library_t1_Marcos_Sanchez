"use client";

import { useEffect, useState } from "react";
import { subscribeToTracking } from "@/lib/tracking";

export const RealtimeDashboard = () => {
  const [events, setEvents] = useState<any[]>([]);

  // Subscribe to tracking events
  useEffect(() => {
    subscribeToTracking((event) => {
      setEvents((prev) => [event, ...prev]);
    });
  }, []);

  const total = events.length;

  // Export JSON
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analytics.json";
    a.click();
  };

  // Export CSV
  const exportCSV = () => {
    const header = "timestamp,component,action,variant\n";
    const rows = events
      .map((e) => `${e.timestamp},${e.component},${e.action},${e.variant || ""}`)
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analytics.csv";
    a.click();
  };

  return (
    <section className="space-y-4 border-t pt-8 mt-12">
      <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>

      {/* Total Interactions */}
      <div className="text-xl font-semibold">
        Total interactions: <span className="text-blue-600">{total}</span>
      </div>

      {/* Export buttons */}
      <div className="flex gap-4">
        <button
          onClick={exportJSON}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Export JSON
        </button>

        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-secondary rounded-md"
        >
          Export CSV
        </button>
      </div>

      {/* Events table */}
      <div className="mt-6 border rounded-lg overflow-hidden bg-white">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Timestamp</th>
              <th className="p-2">Component</th>
              <th className="p-2">Action</th>
              <th className="p-2">Variant</th>
            </tr>
          </thead>

          <tbody>
            {events.map((e, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">
                  {new Date(e.timestamp).toLocaleTimeString()}
                </td>
                <td className="p-2">{e.component}</td>
                <td className="p-2">{e.action}</td>
                <td className="p-2">{e.variant || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
