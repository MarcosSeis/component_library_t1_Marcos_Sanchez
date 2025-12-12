"use client";

import {
  ButtonsDemo,
  InputsDemo,
  ModalDemo,
  CardDemo
} from "./demo";
import { RealtimeDashboard } from "./dashboard/RealtimeDashboard";


export default function DemoPage() {
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-bold">Component Library Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ButtonsDemo />
        <InputsDemo />
      </div>

      <ModalDemo />

      <CardDemo />

      <RealtimeDashboard />

    </div>
  );
}
