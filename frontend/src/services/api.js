const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.detail || "The request could not be completed.");
  }
  return data;
}

export const createToken = (payload) =>
  request("/tokens", { method: "POST", body: JSON.stringify(payload) });

export const getToken = (token) =>
  request(`/tokens/${encodeURIComponent(token)}`);

export const getQueuePosition = (token) =>
  request(`/queue/position/${encodeURIComponent(token)}`);

export const getWaitEstimate = (token) =>
  request(`/tokens/${encodeURIComponent(token)}/estimate`);

export const getQueueStatus = () => request("/queue/status");
export const getQueue = () => request("/queue");
