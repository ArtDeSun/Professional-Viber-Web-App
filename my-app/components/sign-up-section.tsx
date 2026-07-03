"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUp } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SignUpSection() {
  const [name, setName] = useState("");
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
      const result = await signUp.email({ name, email, password });
      if (result.error) {
        setError(result.error.message ?? "Failed to sign up");
      } else {
        //router.push("/dashboard");
        window.location.href = "/";
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="signup"
      className="border-t border-white/15 bg-neutral-950 px-4 py-16"
    >
      <div className="container mx-auto flex justify-center p-16">
        {/* overflow-visible  */}
        <Card className="w-full max-w-lg border-gray-200 shadow-lg bg-neutral-950">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-4xl font-bold text-neutral-50 font-figtree">
              Let's Connect
            </CardTitle>
            {/* Stay updated with new music videos and piano tips*/}
            {/* Get the latest music videos and piano learning tips */}
            {/* Discover new music videos and piano practice tips */}
            {/* Follow for fresh music videos and piano insights */}
            {/* Stay inspired with music videos and piano guidance */}
            <CardDescription className="text-xl text-neutral-400 font-figtree">
              Latest music content and piano tips, all in one.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div
              className="py-4 pt-12 rounded-2xl border border-amber-500/50 bg-neutral-900 
                            font-figtree"
            >
              <CardContent className="space-y-4">
                {error && (
                  <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                <div className="grid gap-2">
                  <Input
                    id="name"
                    type="text"
                    placeholder="First Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-10 md:text-lg placeholder:text-lg
                               bg-neutral-50 border-gray-300 transition-all duration-300
                               focus-visible:border-amber-500
                               focus-visible:ring-2 focus-visible:ring-amber-500"
                  />
                </div>
                <div className="grid gap-2">
                  {/* <label htmlFor="email" className="text-gray-700">
                    Email
                  </label> */}
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 md:text-lg placeholder:text-lg
                               bg-neutral-50 border-gray-300 transition-all duration-300
                               focus-visible:border-amber-500
                               focus-visible:ring-2 focus-visible:ring-amber-500"
                  />
                </div>
                <div className="grid gap-2">
                  {/* <label htmlFor="password" className="text-gray-700">
                    Password
                  </label> */}
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password Mininum 8 Characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="h-10 md:text-lg placeholder:text-lg
                               bg-neutral-50 border-gray-300 transition-all duration-300
                               focus-visible:border-amber-500
                               focus-visible:ring-2 focus-visible:ring-amber-500"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 border-none bg-neutral-900">
                <Button
                  type="submit"
                  className="h-10 text-lg w-full bg-amber-500 text-neutral-950 hover:cursor-pointer hover:bg-amber-500/70"
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>
                <p className="text-lg text-center text-neutral-200">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="font-medium text-amber-500 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </CardFooter>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
