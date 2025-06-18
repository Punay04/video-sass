"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      alert(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-sm text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google sign-in */}
        <button
          onClick={() => signIn("google")}
          className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          {/* Simple Google icon (optional) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-5 h-5"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.26 0 5.9 1.12 7.82 2.96l5.8-5.8C34.54 3.9 29.63 1.5 24 1.5 14.7 1.5 7.1 7.48 4.12 15.32l6.83 5.3C12.8 12.6 17.9 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.1 24.5c0-1.69-.15-3.32-.43-4.91H24v9.3h12.3c-.53 2.85-2.12 5.27-4.45 6.9l6.83 5.29C42.9 37.4 46.1 31.56 46.1 24.5z"
            />
            <path
              fill="#FBBC05"
              d="M10.95 28.7c-.5-1.48-.79-3.04-.79-4.7 0-1.66.29-3.22.79-4.7l-6.83-5.3A22.48 22.48 0 0 0 1.9 24c0 3.59.86 6.98 2.39 9.99l6.66-5.29z"
            />
            <path
              fill="#34A853"
              d="M24 46.5c6.5 0 12-2.13 16.06-5.79l-6.66-5.29c-2.12 1.42-4.8 2.25-9.4 2.25-6.06 0-11.18-3.61-13.04-9.02l-6.83 5.29C7.1 40.52 14.7 46.5 24 46.5z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
