"use client";

import { signOut, useSession } from "@/lib/auth/auth-client";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function NavbarRightCorner() {
  const { data: session, isPending } = useSession();

  const [initialAuthChecked, setInitialAuthChecked] = useState(false);
  useEffect(() => {
    if (!isPending && !initialAuthChecked) {
      setInitialAuthChecked(true);
    }
  }, [isPending, initialAuthChecked]);

  const isLoggedIn = Boolean(session?.user);

  const pathname = usePathname();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setError("");
    setLoading(true);
    setSigningOut(true);

    try {
      const result = await signOut();
      if (result.error) {
        setError(result.error.message ?? "Failed to log out");
        alert("Error signing out");
      } else {
        if (pathname === "/dashboard") {
          window.location.replace("/");
        } else {
          //router.push("/");
          //window.location.href = "/";
          //router.refresh();
          window.location.reload();
        }
      }
    } catch (err) {
      setSigningOut(false);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (pathname === "/sign-in" || signingOut) {
    return <></>;
  }

  return (
    <>
      {!initialAuthChecked ? (
        <></>
      ) : !isLoggedIn ? (
        <Link href="/sign-in" className="mx-auto">
          <Button
            className="relative overflow-hidden h-10 w-28 bg-amber-400 text-black text-xl rounded-xl 
                             cursor-pointer group"
          >
            <span
              className="
                        absolute inset-0 bg-amber-600
                        origin-top
                        scale-y-100
                        transition-transform duration-500
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover:scale-y-0
                      "
            />
            <span className="relative z-10">Sign In</span>
          </Button>
        </Link>
      ) : (
        <>
          <Link href="/dashboard" className="flex items-center">
            <Button
              className="h-10 w-36 bg-amber-600 text-black text-xl rounded-xl 
                         hover:bg-amber-400 cursor-pointer"
            >
              Dashboard
            </Button>
          </Link>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                className="group cursor-pointer hover:[filter:drop-shadow(0_0_6px_orange)]
                           data-[state=open]:drop-shadow-[0_0_6px_orange]
                           data-[state=open]:cursor-pointer"
              >
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-amber-600 text-black text-xl font-bold">
                    {session?.user?.name ? (
                      <span
                        className="inline-block transition-transform duration-300 group-hover:scale-125
                                 group-data-[state=open]:scale-125"
                      >
                        {session.user.name[0].toUpperCase()}
                      </span>
                    ) : (
                      <span className="h-6 w-6 animate-spin rounded-full border-3 border-black/30 border-t-black" />
                    )}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            {/* align="end" means right edge alignment, 
                sideOffset={} gives a margin between the dropdown menu Trigger and the dropdown menu content */}
            <DropdownMenuContent
              align="end"
              sideOffset={24}
              /* shadow of roughly amber-500 */
              className="w-56 rounded-2xl 
                         border border-white/5 ring-1 ring-white/10
                         bg-black/80 backdrop-blur-xs
                         shadow-[0_0_20px_rgba(245,158,11,0.25)]
                         animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-300"
            >
              {/* <DropdownMenuLabel className="border-b border-amber-600/30 pb-3">
                    <div className="space-y-1">
                      <p>{session.user.name}</p>
                      <p>{session.user.email}</p>
                    </div>
                  </DropdownMenuLabel> */}

              <DropdownMenuLabel className="font-playfairDisplay border-b border-gray-300/30 py-8">
                <div className="flex flex-col items-center space-y-4">
                  {session?.user?.name ? (
                    <>
                      <Avatar className="w-14 h-14">
                        <AvatarFallback className="bg-amber-600 text-black text-2xl font-bold">
                          {session?.user.name[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-center text-center gap-1">
                        <p className="text-xl text-gray-100">
                          {session?.user.name}
                        </p>
                        <p className="text-base text-gray-100/80">
                          {session?.user.email}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Avatar className="w-14 h-14">
                        <AvatarFallback className="bg-amber-600 text-black text-2xl font-bold">
                          <span className="h-6 w-6 animate-spin rounded-full border-3 border-black/30 border-t-black" />
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col items-center text-center gap-1">
                        <p className="text-xl text-gray-100">Loading...</p>
                        <p className="text-base text-gray-100/80">
                          Please wait
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </DropdownMenuLabel>

              <DropdownMenuItem
                onClick={handleSignOut}
                className="group font-playfairDisplay mx-2 my-2 cursor-pointer 
                           rounded-md text-gray-100/80 font-medium transition-all duration-200
                           data-[highlighted]:bg-amber-500/15 data-[highlighted]:text-white
                           data-[highlighted]:shadow-[0_0_20px_rgba(245,158,11,0.25)]"
              >
                <LogOut className="transition-colors duration-200 group-data-[highlighted]:stroke-white" />
                Log out
              </DropdownMenuItem>
              {error && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
}
