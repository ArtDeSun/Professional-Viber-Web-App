"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signIn.email({ email, password });
      if (result.error) {
        setError(result.error.message ?? "Failed to sign in");
        setLoading(false);
        return;
      }
      //router.push("/dashboard");
      window.location.href = "/";
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="mx-auto py-32 px-4 bg-neutral-950">
          <div className="container mx-auto flex justify-center p-16">
            {/* overflow-visible  */}
            <Card className="w-full max-w-lg border-gray-200 shadow-lg bg-neutral-950">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-3xl font-bold text-neutral-50">
                  Sign In
                </CardTitle>
                <CardDescription className="text-base text-neutral-400">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="py-4 pt-12 rounded-2xl border border-amber-500 bg-neutral-900">
                  <CardContent className="space-y-4">
                    {error && (
                      <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                        {error}
                      </div>
                    )}
                    <div className="grid gap-2">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-neutral-50 border-gray-300 transition-all duration-300
                               focus-visible:border-amber-500
                               focus-visible:ring-2 focus-visible:ring-amber-500"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        className="bg-neutral-50 border-gray-300 transition-all duration-300
                               focus-visible:border-amber-500
                               focus-visible:ring-2 focus-visible:ring-amber-500"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4 border-none bg-neutral-900">
                    <Button
                      type="submit"
                      className="w-full bg-amber-500 text-neutral-950 hover:cursor-pointer hover:bg-amber-500/70"
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                    <p className="text-center text-sm text-neutral-200">
                      Don't have an account?{" "}
                      <Link
                        href="/sign-up"
                        className="font-medium text-amber-500 hover:underline"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </CardFooter>
                </div>
              </form>
            </Card>
          </div>

          {/* <div className="container mx-auto flex justify-center p-16">
            <Card className="w-full max-w-md border-gray-200 shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-black">
                  Sign In
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <CardContent className="space-y-4">
                  {error && (
                    <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                      {error}
                    </div>
                  )}
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-gray-700">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="John@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-gray-300 transition-all duration-300 focus-visible:border-amber-400 focus-visible:ring-amber-400"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="password" className="text-gray-700">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="John Doe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      className="border-gray-300 transition-all duration-300 focus-visible:border-amber-400 focus-visible:ring-amber-400"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    className="w-full bg-amber-400 hover:cursor-pointer hover:bg-amber-400/70"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      href="/sign-up"
                      className="font-medium text-amber-400 hover:underline"
                    >
                      Sign Up
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div> */}
        </section>
      </main>
    </div>
  );
}
