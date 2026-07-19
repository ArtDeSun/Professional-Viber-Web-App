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
import React, { MouseEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SignUpSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //const router = useRouter();

  /* React.useEffect(() => {
    console.log("SignUp mounted");

    return () => {
      console.log("SignUp unmounted");
    };
  }, []); */

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
      setLoading(false);
    }
  }

  const handleSignInFromSignUp = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = "/sign-in";
  };

  return (
    <section
      id="signup"
      className="border-t border-white/15 bg-neutral-950 px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="container mx-auto flex justify-center px-0 sm:px-4 lg:px-16">
        <Card className="w-full max-w-lg border-gray-200 bg-neutral-950 shadow-lg">
          <CardHeader className="space-y-2 px-4 text-center sm:px-6">
            <CardTitle className="font-figtree text-3xl font-bold text-neutral-50 sm:text-4xl">
              Let&apos;s Connect
            </CardTitle>

            <CardDescription className="font-figtree text-base text-neutral-400 sm:text-lg md:text-xl">
              Latest music content and piano tips, all in one.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div
              className="
                rounded-2xl overflow-hidden border border-amber-500/50 bg-neutral-900
                pt-8 font-figtree sm:pt-12
              "
            >
              <CardContent className="space-y-4 px-4 sm:px-6">
                {error && (
                  <div className="break-words rounded-md bg-destructive/15 p-3 text-sm text-destructive">
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
                    className="
                      h-10 bg-neutral-50 text-base
                      border-gray-300 transition-all duration-300
                      placeholder:text-base sm:h-11 sm:text-lg sm:placeholder:text-lg 
                      md:text-lg
                      focus-visible:border-amber-500
                      focus-visible:ring-2 focus-visible:ring-amber-500
                    "
                  />
                </div>

                <div className="grid gap-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="
                      h-10 bg-neutral-50 text-base
                      border-gray-300 transition-all duration-300
                      placeholder:text-base sm:h-11 sm:text-lg sm:placeholder:text-lg
                      md:text-lg
                      focus-visible:border-amber-500
                      focus-visible:ring-2 focus-visible:ring-amber-500
                    "
                  />
                </div>

                <div className="grid gap-2">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password Minimum 8 Characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="
                      h-10 bg-neutral-50 text-base
                      border-gray-300 transition-all duration-300
                      placeholder:text-sm sm:h-11 sm:text-lg sm:placeholder:text-lg
                      md:text-lg
                      focus-visible:border-amber-500
                      focus-visible:ring-2 focus-visible:ring-amber-500
                    "
                  />
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4 border-none bg-neutral-900 px-4 pb-6 sm:px-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="
                    h-10 w-full bg-amber-500 text-base text-neutral-950
                    hover:cursor-pointer hover:bg-amber-500/70
                    sm:h-11 sm:text-lg
                  "
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </Button>

                <p className="text-center text-base text-neutral-200 sm:text-lg">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    onClick={handleSignInFromSignUp}
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
