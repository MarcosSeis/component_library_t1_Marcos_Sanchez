"use client";

import { useEffect, useState } from "react";
import { subscribeToTracking } from "@/lib/tracking";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const RealtimeDashboard = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      const res = await fetch(`${API_URL}/components/stats`);
      const data = await res.json();

      
      setEvents(data.events || []);
    } catch (e) {
      console.error("Failed to load stats", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    subscribeToTracking((newTotal) => {
      setEvents((prev) => {
        const currentTotal = prev.length;
        const missingEvents = newTotal - currentTotal;
        if (missingEvents > 0) {
          loadStats();
        }

        return prev;
      });
    });
  }, []);

  const total = events.length;

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

  const exportCSV = async () => {
    const res = await fetch(`${API_URL}/components/export`);

    const csv = await res.text();
    const blob = new Blob([csv], { type: "text/csv" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "analytics.csv";
    a.click();
  };

  if (loading) {
    return <p>Loading analytics…</p>;
  }

  return (
    <section className="space-y-4 border-t pt-8 mt-12">
      <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>

      <div className="text-xl font-semibold">
        Total interactions: <span className="text-blue-600">{total}</span>
      </div>

      <div className="flex gap-4">
        <button
          onClick={exportJSON}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Export JSON
        </button>

        <button
          onClick={exportCSV}
          className="px-4 py-2 bg-secondary rounded-md text-white"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
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
