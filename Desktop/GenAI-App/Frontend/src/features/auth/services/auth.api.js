import axios from "axios";

const api = axios.create({
  // VITE_API_BASE_URL check karega, agar na mile toh direct Render backend URL use karega
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://genai-app-3w8f.onrender.com/api",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  try {
    // 🟢 Extra '/api' hata diya hai
    const response = await api.post('/auth/register', {
      username, email, password
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err; // Component handle kar sake isiliye error throw karna better hota hai
  }
}

export async function login({ email, password }) {
  try {
    // 🟢 Extra '/api' hata diya hai
    const response = await api.post("/auth/login", {
      email, password
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function logout() {
  try {
    // 🟢 Extra '/api' hata diya hai
    const response = await api.get("/auth/logout");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getMe() {
  try {
    // 🟢 Extra '/api' hata diya hai
    const response = await api.get("/auth/get-me");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}