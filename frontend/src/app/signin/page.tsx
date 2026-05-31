"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignInPage() {
  const router = useRouter();

  const { login } = useAuth();

  function handleLogin() {
    login({
      id: "1",
      name: "Sudhir",
    });

    router.push("/");
  }

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="mb-6 text-3xl font-bold">
          Sign In
        </h1>

        <input
          placeholder="Email"
          className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
        />

        <button
          onClick={handleLogin}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}