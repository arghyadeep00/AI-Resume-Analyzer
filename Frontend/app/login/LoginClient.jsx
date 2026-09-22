"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrainCircuit } from "lucide-react";
import { useState } from "react";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
      setIsLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-border">
        <div className="flex flex-col items-center">
          <div className="bg-blue-50 p-3 rounded-full mb-4">
            <BrainCircuit className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-center text-3xl font-extrabold font-poppins text-text-dark">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-text-muted">
            Sign in to access your recruitment dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label
                htmlFor="email-address"
                className="text-sm font-medium text-text-dark"
              >
                Email address
              </label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-text-dark"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full h-11 text-base shadow-md shadow-blue-500/20"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-text-muted">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
