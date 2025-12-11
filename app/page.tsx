import { Button } from "@/components/Button";

export default function DemoPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Component Library Demo</h1>

      <section>
        <h2 className="text-xl font-semibold">Buttons</h2>

        <div className="flex gap-4 flex-wrap mt-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>

          <Button state="loading">Loading</Button>
          <Button state="disabled">Disabled</Button>

          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
      </section>
    </div>
  );
}
