export function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
}

export function getToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") ?? "";
}
