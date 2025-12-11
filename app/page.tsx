"use client";

import { ButtonsDemo } from "./demo/ButtonDemo";
import { InputsDemo } from "./demo/InputDemo";
import { ModalDemo } from "./demo/ModalDemo";

export default function DemoPage() {
  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-bold">Component Library Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ButtonsDemo />
        <InputsDemo />
      </div>

      <ModalDemo />
    </div>
  );
}
