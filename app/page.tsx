"use client";

import { ButtonsDemo } from "./demo/ButtonDemo";
import { InputsDemo } from "./demo/InputDemo";

export default function DemoPage() {
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-bold">Component Library Demo</h1>

      <ButtonsDemo />
      <InputsDemo />
    </div>
  );
}
