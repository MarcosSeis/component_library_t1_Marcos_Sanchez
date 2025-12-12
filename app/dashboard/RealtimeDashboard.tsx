"use client";

import { useState, useEffect } from "react";
import { exportCSV } from "@/lib/export";
import { getToken } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type EventRow = {
  component: string;
  variant: string;
  action: string;
  timestamp: string;
};

export function RealtimeDashboard() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 15;

  const loadStats = async () => {
    try {
      const res = await fetch(`${API_URL}/components/stats`);
      const data = await res.json();

      // Convertimos respuesta del backend a filas reales
      const flatEvents: EventRow[] = (data.events || []).map((e: any) => ({
        component: e.component,
        variant: e.variant ?? "—",
        action: e.action,
        timestamp: e.createdAt,
      }));

      setEvents(flatEvents.reverse());
    } catch (err) {
      console.error("Failed to load stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();

    // Poll cada 3s (simple y suficiente para la prueba)
    const interval = setInterval(loadStats, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalPages = Math.max(1, Math.ceil(events.length / PAGE_SIZE));
  const paginated = events.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement("a"), {
      href: url,
      download: "analytics.json",
    });
    link.click();
  };

  if (loading) {
    return <p className="text-gray-600">Loading analytics…</p>;
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>

      <div className="text-lg font-semibold">
        Total Interactions:{" "}
        <span className="text-blue-600">{events.length}</span>
      </div>

      {/* EXPORT BUTTONS */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => exportCSV(getToken())} 
          className="px-4 py-2 bg-secondary rounded-md hover:opacity-90"
        >
          Export CSV
        </button>

        <button
          onClick={exportJSON}
          className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90"
        >
          Export JSON
        </button>
      </div>

      {/* TABLE */}
      <div className="border rounded-lg overflow-hidden bg-white">
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
            {paginated.map((e, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">
                  {new Date(e.timestamp).toLocaleString()}
                </td>
                <td className="p-2">{e.component}</td>
                <td className="p-2">{e.action}</td>
                <td className="p-2">{e.variant}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-1 bg-gray-200 rounded disabled:opacity-40"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-1 bg-gray-200 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
}
