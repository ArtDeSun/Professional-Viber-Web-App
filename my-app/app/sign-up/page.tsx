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
import { signUp } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    setError("");
    setLoading(true); //needs to accept Boolean

    try {
      const result = await signUp.email({ name, email, password });
      if (result.error) {
        setError(result.error.message ?? "Failed to sign up");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="mx-auto py-32 px-4">
          <div className="mx-auto">
            {/* TEMPORARY */}
            {/* <div className="container mx-auto max-w-6xl mb-8">
              <div className="flex justify-center mb-8">
                <Button
                  className={`rounded-lg px-6 py-3 text-sm font-medium 
                    transition-colors duration-300 hover:cursor-pointer ${"bg-amber-400 hover:bg-amber-400/70"}`}
                >
                  Experimental Sign-Up Page
                </Button>
              </div>
              <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-2xl">
                <Image
                  src="/hero-images/Stay_In_Touch_Template.png"
                  alt="Mock Template for Signing Up"
                  width={1200}
                  height={800}
                />
              </div>
            </div> */}

            <div className="flex justify-center p-16">
              {/* overflow-visible  */}
              <Card className="w-full max-w-md border-gray-200 shadow-lg">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-black">
                    Sign Up
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Create an account to start tracking your job applications
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
                      <label htmlFor="name" className="text-gray-700">
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border-gray-300 transition-all duration-300 focus-visible:border-amber-400 focus-visible:ring-amber-400"
                      />
                    </div>
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
                      {loading ? "Creating account..." : "Sign Up"}
                    </Button>
                    <p className="text-center text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link
                        href="/sign-in"
                        className="font-medium text-amber-400 hover:underline"
                      >
                        Sign In
                      </Link>
                    </p>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
