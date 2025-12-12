"use client";

import { useEffect, useState } from "react";
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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    return (
      <p className="text-center text-gray-600 mt-10">
        Checking session…
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">
        Component Library Demo
      </h1>

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT: COMPONENT DEMOS */}
        <div className="lg:col-span-2 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ButtonsDemo />
            <InputsDemo />
          </div>

          <ModalDemo />
          <CardDemo />
        </div>

        {/* RIGHT: DASHBOARD */}
        <div className="lg:col-span-1">
          <RealtimeDashboard />
        </div>

      </div>
    </div>
  );
}
