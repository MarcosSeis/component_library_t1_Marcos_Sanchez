"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await login(email, password);

    if (!res.success) {
      setError(res.error || "Login failed");
      return;
    }

    router.push("/"); // redirect al dashboard
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 max-w-sm mx-auto border rounded-md shadow"
    >
      <h1 className="text-xl font-semibold">Login</h1>

      {error && (
        <p className="text-red-600 text-sm bg-red-100 p-2 rounded">{error}</p>
      )}

      <input
        className="w-full border p-2 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="w-full border p-2 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-primary text-white p-2 rounded"
      >
        Login
      </button>
    </form>
  );
}
