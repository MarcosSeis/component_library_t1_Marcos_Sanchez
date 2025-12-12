"use client";

import { Input } from "@/components";
import { useState } from "react";

export const InputsDemo = () => {
  const [textValue, setTextValue] = useState("");
  const [emailValue, setEmailValue] = useState("");

  return (
    <section className="space-y-10">
      <h2 className="text-2xl font-semibold">Inputs</h2>

      <div className="p-6 rounded-lg border bg-white shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <Input
          label="Name"
          placeholder="Enter your name"
          value={textValue}
          onChange={setTextValue}
        />

        <Input
          label="Email"
          type="email"
          placeholder="example@mail.com"
          value={emailValue}
          onChange={setEmailValue}
        />

        <Input
          label="Username"
          placeholder="Pick a username"
          state="error"
          helperText="This username is already taken"
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          state="success"
          helperText="Password looks good!"
        />

        <Input
          label="Disabled Input"
          placeholder="You can't type here"
          state="disabled"
        />
      </div>
    </section>
  );
};
