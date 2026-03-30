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
    const message = data?.message || response.statusText;
    throw new Error(message);
  }

  return data;
}

export function getProjects() {
  return request("/projects");
}

export function getProjectById(id) {
  return request(`/projects/${id}`);
}

export function getProjectTasks(projectId) {
  return request(`/projects/${projectId}/tasks`);
}
