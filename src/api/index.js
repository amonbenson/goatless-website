import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env["VITE_API_BASE_URL"] ?? "http://localhost:5000",
  timeout: 5000,
  validateStatus: (status) => status >= 200 && status < 300,
});

export async function getEvents() {
  try {
    const res = await api.get("/events");
    return res.data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error fetching events:", err.message);
    return [];
  }
}
