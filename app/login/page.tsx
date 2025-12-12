"use client";

import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const result = await login(email, password);

    if (!result.success) {
      setErrorMsg(result.error || "Login failed");
      setLoading(false);
      return;
    }

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 pt-8 pb-6"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {/* Email */}
        <div className="mb-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={setEmail}
            state={errorMsg ? "error" : "default"}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <Input
            label="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={setPassword}
            state={errorMsg ? "error" : "default"}
          />
        </div>

        {/* Error message */}
        {errorMsg && (
          <p className="text-red-500 text-sm mb-4 text-center">{errorMsg}</p>
        )}

        {/* Submit */}
        <Button
          variant="primary"
          size="large"
          state={loading ? "loading" : "default"}
          className="w-full"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
