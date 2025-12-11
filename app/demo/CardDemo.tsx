"use client";

import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export const CardDemo = () => {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold">Cards</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Default Card */}
        <Card title="Default Card" variant="default">
          This is a simple card with default border settings.
        </Card>

        {/* Subtle Card */}
        <Card
          title="Subtle Card"
          variant="subtle"
          image="https://picsum.photos/400/200"
        >
          This card uses a subtle border and includes an image.
        </Card>

        {/* Strong Card */}
        <Card
          title="Strong Card"
          variant="strong"
          footer={
            <Button size="small" onClick={() => alert("Clicked!")}>
              Action
            </Button>
          }
        >
          This card uses a stronger border and has an action footer.
        </Card>

        {/* Mixed Content */}
        <Card
          title="Profile Card"
          variant="default"
          image="https://picsum.photos/400/210"
          footer={
            <div className="flex justify-between">
              <Button size="small" variant="secondary">
                Cancel
              </Button>
              <Button size="small" variant="primary">
                Save
              </Button>
            </div>
          }
        >
          Cards are flexible enough to hold images, text and components in the
          footer.
        </Card>
      </div>
    </section>
  );
};
