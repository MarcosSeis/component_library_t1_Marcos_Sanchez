"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Invalid credentials",
      };
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "Network error logging in",
    };
  }
}

export async function register(name: string, email: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Registration failed",
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "Network error registering user",
    };
  }
}

