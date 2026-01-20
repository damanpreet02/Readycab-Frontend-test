import { useState } from "react";
import axios from "axios";

export default function Login({ onLoginSuccess }) {

  // Prefilled values (you can change these later)
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("ReadyCab@#123");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const BASE_URL = process.env.production.REACT_APP_API_URL;

const res = await axios.post(
  `${BASE_URL}/api/auth/login`,
  { email, password }
);
// if API returns token, login is successful
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data))


    onLoginSuccess();   // <-- THIS OPENS PricingUI

  } catch (err) {
  console.log("Full error:", err);

  if (err.response) {
    console.log("Backend says:", err.response.data);
    alert(err.response.data.message || "Wrong email or password");
  } else {
    alert("Server not reachable");
  }
}

};



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-4">Sign in</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
