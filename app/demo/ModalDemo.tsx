"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal"

export const ModalDemo = () => {
  const [openSmall, setOpenSmall] = useState(false);
  const [openMedium, setOpenMedium] = useState(false);
  const [openLarge, setOpenLarge] = useState(false);

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold">Modal</h2>

      {/* Buttons to open modals */}
      <div className="flex gap-4 flex-wrap">
        <Button onClick={() => setOpenSmall(true)}>Open Small Modal</Button>
        <Button onClick={() => setOpenMedium(true)}>Open Medium Modal</Button>
        <Button onClick={() => setOpenLarge(true)}>Open Large Modal</Button>
      </div>

      {/* Small Modal */}
      <Modal
        open={openSmall}
        size="small"
        title="Small Modal"
        onClose={() => setOpenSmall(false)}
        footer={
          <div className="flex justify-end">
            <Button onClick={() => setOpenSmall(false)}>Close</Button>
          </div>
        }
      >
        <p>This is a small modal for alerts or quick confirmations.</p>
      </Modal>

      {/* Medium Modal */}
      <Modal
        open={openMedium}
        size="medium"
        title="Medium Modal"
        onClose={() => setOpenMedium(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpenMedium(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpenMedium(false)}>Accept</Button>
          </div>
        }
      >
        <p>
          Medium modals are ideal for forms, confirmations or multi-step
          interactions.
        </p>
      </Modal>

      {/* Large Modal */}
      <Modal
        open={openLarge}
        size="large"
        title="Large Modal"
        onClose={() => setOpenLarge(false)}
        footer={
          <div className="flex justify-end">
            <Button onClick={() => setOpenLarge(false)}>Close</Button>
          </div>
        }
      >
        <p>
          Large modals are great for displaying detailed information or large
          forms.
        </p>
        <p className="mt-4">
          You can include more structured content inside the modal body.
        </p>
      </Modal>
    </section>
  );
};
