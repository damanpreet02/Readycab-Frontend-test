import { useState } from "react";
import axios from "axios";

export default function Login({ onLoginSuccess }) {

  // Prefilled values (you can change these later)
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("ReadyCab@#123");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

try {
  onLoginSuccess();
} catch (err) {
  setError(err.response?.data?.message || "Invalid credentials");
} finally {
  setLoading(false);
}


  try {
    const BASE_URL = process.env.REACT_APP_API_URL;

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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black px-6">

     {/* Glow blobs */}
    <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[140px] animate-pulse" />
    <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[160px] animate-pulse" />
    <div className="absolute bottom-[-200px] left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[160px] animate-pulse" />

    {/* Centered Card */}
    {/* <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.45)] p-10"> */}


    <div className="w-full max-w-md bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-10 animate-fadeIn">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Pricing & Operations
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Secure admin access
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-xl">
            {error}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@readycab.com"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>

        {/* Password */}
<div>
  <label className="block text-xs font-medium text-gray-600 mb-1" >
    Password:
  </label>

  {/* <div className="relative"> */}
    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="••••••••"
      className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
      required
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
      aria-label="Toggle password visibility"
    >
      {showPassword ? (
        // Eye off
        // <svg
        //   xmlns="http://www.w3.org/2000/svg"
        //   width="12" 
        //   height="12" 
        //   // fill="currentColor"
        //   className="h-5 w-5"
        //   class="bi bi-eye"  
        //   viewBox="0 0 16 16"
        //   fill="none"
        //   // viewBox="0 0 24 24"
        //   stroke="currentColor"
        //   strokeWidth={2}
        // >
        //   <path
        //     strokeLinecap="round"
        //     strokeLinejoin="round"
        //     d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
        //     // d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
        //     // d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.219 1.125-4.575M21.8 21.8L2.2 2.2M9.9 9.9a3 3 0 104.2 4.2"
        //   />
        // </svg>

        <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M14.7649 6.07595C14.9991 6.22231 15.0703 6.53078 14.9239 6.76495C14.4849 7.46742 13.9632 8.10644 13.3702 8.66304L14.5712 9.86405C14.7664 10.0593 14.7664 10.3759 14.5712 10.5712C14.3759 10.7664 14.0593 10.7664 13.8641 10.5712L12.6011 9.30816C11.8049 9.90282 10.9089 10.3621 9.93374 10.651L10.383 12.3276C10.4544 12.5944 10.2961 12.8685 10.0294 12.94C9.76266 13.0115 9.4885 12.8532 9.41703 12.5864L8.95916 10.8775C8.48742 10.958 8.00035 10.9999 7.5 10.9999C6.99964 10.9999 6.51257 10.958 6.04082 10.8775L5.58299 12.5864C5.51153 12.8532 5.23737 13.0115 4.97063 12.94C4.7039 12.8685 4.5456 12.5944 4.61706 12.3277L5.06624 10.651C4.09111 10.3621 3.19503 9.90281 2.3989 9.30814L1.1359 10.5711C0.940638 10.7664 0.624058 10.7664 0.428797 10.5711C0.233537 10.3759 0.233537 10.0593 0.428797 9.86404L1.62982 8.66302C1.03682 8.10643 0.515113 7.46742 0.0760677 6.76495C-0.0702867 6.53078 0.000898544 6.22231 0.235064 6.07595C0.46923 5.9296 0.777703 6.00078 0.924057 6.23495C1.40354 7.00212 1.989 7.68056 2.66233 8.2427C2.67315 8.25096 2.6837 8.25971 2.69397 8.26897C4.00897 9.35527 5.65536 9.9999 7.5 9.9999C10.3078 9.9999 12.6563 8.50629 14.0759 6.23495C14.2223 6.00078 14.5308 5.9296 14.7649 6.07595Z"
    fill="#000000"
  />
</svg>
      ) : (
        // Eye
        // <svg
        //   xmlns="http://www.w3.org/2000/svg"
        //   width="12" 
        //   height="12" 
        //   // fill="currentColor"
        //   className="h-5 w-5"
        //   class="bi bi-eye"
        //   fill="none"
        //   viewBox="0 0 16 16"
        //   stroke="currentColor"
        //   strokeWidth={2}
        // >
        //   <path
        //     strokeLinecap="round"
        //     strokeLinejoin="round"
        //     // d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.219 1.125-4.575M21.8 21.8L2.2 2.2M9.9 9.9a3 3 0 104.2 4.2"
        //     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        //   />
        //   <path
        //     strokeLinecap="round"
        //     strokeLinejoin="round"
        //     d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
        //     // d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        //   />
        // </svg>

        <svg 
        fill="#000000" 
        width="12" 
        height="12" 
        viewBox="-2 -6 24 24" 
        xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="xMinYMin" 
        class="jam jam-eye">
          <path 
          d='M18 6c0-1.81-3.76-3.985-8.007-4C5.775 1.985 2 4.178 2 6c0 1.825 3.754 4.006 7.997 4C14.252 9.994 18 7.82 18 6zm-8 6c-5.042.007-10-2.686-10-6S4.984-.017 10 0c5.016.017 10 2.686 10 6s-4.958 5.993-10 6zm0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'
          />
        </svg>
      )}
    </button>
  {/* </div> */}
</div>


        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/30"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

    </div>
  </div>
);


}
