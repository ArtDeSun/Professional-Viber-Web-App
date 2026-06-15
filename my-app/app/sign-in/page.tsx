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
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="mx-auto py-32 px-4">
          <div className="mx-auto">
            <div className="flex justify-center p-16">
              {/* overflow-visible  */}
              <Card className="w-full max-w-md border-gray-200 shadow-lg">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-black">
                    Sign In
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <form className="space-y-4">
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-gray-700">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="John@example.com"
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
                    >
                      Sign In
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
