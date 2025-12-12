"use client";

import { Button } from "@/components";

export const ButtonsDemo = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Buttons</h2>

      <div className="flex gap-4 flex-wrap">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>

        <Button size="small">Small</Button>
        <Button size="large">Large</Button>

        <Button state="loading">Loading</Button>
        <Button state="disabled">Disabled</Button>
      </div>
    </section>
  );
};
