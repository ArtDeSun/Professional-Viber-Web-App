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
import { signIn, useSession } from "@/lib/auth/auth-client";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";

export default function SignIn() {
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [heroBackgroundVisible, setHeroBackgroundVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!heroImageLoaded) return;
    const backgroundTimer = setTimeout(() => {
      setHeroBackgroundVisible(true);
    }, 100);
    const contentTimer = setTimeout(() => {
      setVisible(true);
    }, 400);
    return () => {
      clearTimeout(backgroundTimer);
      clearTimeout(contentTimer);
    };
  }, [heroImageLoaded]);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      window.location.replace("/");
    }
  }, [session]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* const router = useRouter(); */

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
      //window.location.href = "/";
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  }

  const handleSignUpFromSignIn = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = "/?destination=signup";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="relative flex min-h-screen items-center overflow-hidden bg-neutral-950 px-4 py-24 sm:px-6 sm:py-28 lg:py-32">
          <Image
            src="/hero-images/AI_Generated_Basement_Studio.png"
            alt=""
            fill
            sizes="100vw"
            priority
            onLoad={() => setHeroImageLoaded(true)}
            className={`object-cover object-center transition-all duration-[1400ms] ease-out
              ${heroBackgroundVisible ? "opacity-100" : "opacity-0"}
            `}
          />

          <div className="absolute inset-0 bg-black/80" />

          <div
            className={`relative z-10 mx-auto flex w-full max-w-screen-xl min-w-0 justify-center
              transition-all duration-[1200ms] ease-[cubic-bezier(0.20,1.80,0.30,1)]
              ${visible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"}
            `}
          >
            <Card className="w-full min-w-0 max-w-lg border-gray-200 bg-neutral-950 shadow-lg">
              <CardHeader className="space-y-2 px-4 text-center sm:px-6">
                <CardTitle className="font-figtree text-3xl font-bold text-neutral-50 sm:text-4xl">
                  Sign In
                </CardTitle>

                <CardDescription className="font-figtree text-base leading-relaxed text-neutral-400 sm:text-lg md:text-xl">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit} className="w-full min-w-0">
                <div
                  className="
                    w-full min-w-0 overflow-hidden rounded-2xl
                    border border-amber-500/50 bg-neutral-900
                    pt-8 font-figtree sm:pt-12
                  "
                >
                  <CardContent className="w-full min-w-0 space-y-4 px-4 sm:px-6">
                    {error && (
                      <div className="w-full min-w-0 break-words rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                        {error}
                      </div>
                    )}

                    <div className="grid min-w-0 gap-2">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="
                          h-10 w-full min-w-0 border-gray-300 bg-neutral-50
                          text-base transition-all duration-300
                          placeholder:text-base
                          focus-visible:border-amber-500
                          focus-visible:ring-2 focus-visible:ring-amber-500
                          sm:h-11 sm:text-lg sm:placeholder:text-lg
                          md:text-lg
                        "
                      />
                    </div>

                    <div className="grid min-w-0 gap-2">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        className="
                          h-10 w-full min-w-0 border-gray-300 bg-neutral-50
                          text-base transition-all duration-300
                          placeholder:text-base
                          focus-visible:border-amber-500
                          focus-visible:ring-2 focus-visible:ring-amber-500
                          sm:h-11 sm:text-lg sm:placeholder:text-lg
                          md:text-lg
                        "
                      />
                    </div>
                  </CardContent>

                  <CardFooter className="flex w-full min-w-0 flex-col space-y-4 border-none bg-neutral-900 px-4 pb-6 sm:px-6">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="
                        h-10 w-full min-w-0 bg-amber-500 text-base text-neutral-950
                        hover:cursor-pointer hover:bg-amber-500/70
                        sm:h-11 sm:text-lg
                      "
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>

                    <p className="w-full break-words text-center text-base text-neutral-200 sm:text-lg">
                      Don&apos;t have an account?{" "}
                      <Link
                        href="/?destination=signup"
                        onClick={handleSignUpFromSignIn}
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
        </section>
      </main>
    </div>
  );
}
