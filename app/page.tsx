"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/auth-client";

import {
  ButtonsDemo,
  InputsDemo,
  ModalDemo,
  CardDemo,
} from "./demo";

import { RealtimeDashboard } from "./dashboard/RealtimeDashboard";

export default function DemoPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) router.replace("/login");
  }, []);

  if (!isLoggedIn()) {
    return <p className="text-center text-gray-600">Redirecting…</p>;
  }

  return (
    <div className="p-6 space-y-12">

      <h1 className="text-3xl font-bold mb-6">Component Library Demo</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT: COMPONENT SHOWCASE */}
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ButtonsDemo />
            <InputsDemo />
          </div>

          <ModalDemo />
          <CardDemo />
        </div>

        {/* RIGHT: ANALYTICS */}
        <div>
          <RealtimeDashboard />
        </div>
      </div>
    </div>
  );
}
