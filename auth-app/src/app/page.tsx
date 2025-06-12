'use client';
import { useState } from "react";

const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL || 'https://client.adamgiesey.com';

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRedirect = () => {
    window.location.href = REDIRECT_URL;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    fetch('/api/login')
      .then(response => console.log(response))
      .then(() => handleRedirect())
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <label className="flex flex-col">
          Email
          <input
            type="email"
            className="border rounded px-2 py-1 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="flex flex-col">
          Password
          <input
            type="password"
            className="border rounded px-2 py-1 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
