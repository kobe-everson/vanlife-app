// API wrapper for backend verification
const API_BASE_URL = import.meta.env.API_URL || "http://localhost:4000";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const error = data?.message || response.statusText;
    throw new Error(error);
  }

  return data;
}

export function tryLogin(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function trySignup({ firstName, lastName, email, password }) {
  return request("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
}

export function fetchProfile(token) {
  return request("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
