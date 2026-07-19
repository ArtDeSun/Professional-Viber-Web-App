"use client";

import { signOut, useSession } from "@/lib/auth/auth-client";
import { LogOut, MonitorPlay, PlusSquare, Smartphone } from "lucide-react";
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

  const [videoDashboardOpen, setVideoDashboardOpen] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [signingOut, setSigningOut] = useState(false);

  const goToVideoDashboardPage = (href: string) => {
    setVideoDashboardOpen(false);
    window.location.href = href;

    /* requestAnimationFrame(() => {
      window.location.href = href;
    }); */
  };

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
        //if (
        //pathname === "/dashboard" ||
        //pathname === "/dashboard-landscape-videos" ||
        //pathname === "/dashboard-portrait-videos"
        //) {
        //window.location.replace("/");
        //} else {
        //router.push("/");
        //window.location.href = "/";
        //router.refresh();
        window.location.reload();
        //}
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
    <div className="flex min-w-0 items-center justify-center gap-1 lg:gap-2">
      {!initialAuthChecked ? (
        <></>
      ) : !isLoggedIn ? (
        <Link href="/sign-in">
          <Button
            className="group relative h-9 w-20 overflow-hidden rounded-lg
                        bg-amber-400 px-2 text-base text-black
                        cursor-pointer
                        sm:w-24 sm:text-lg
                        lg:h-10 lg:w-28 lg:rounded-xl lg:px-4 lg:text-xl"
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
          <DropdownMenu
            modal={false}
            open={videoDashboardOpen}
            onOpenChange={setVideoDashboardOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                className="group relative h-9 w-[6rem] overflow-hidden rounded-lg
                                bg-amber-500/80 px-1 text-black text-sm cursor-pointer
                                sm:w-32 sm:text-lg sm:text-base
                                lg:h-10 lg:w-40 lg:rounded-xl lg:px-4 lg:text-xl
                                 hover:[filter:drop-shadow(0_0_6px_orange)]
                                 data-[state=open]:drop-shadow-[0_0_6px_orange]"
              >
                <span
                  className="absolute inset-0 bg-amber-600
                                 origin-top scale-y-100
                                 transition-transform duration-500
                                 ease-[cubic-bezier(0.22,1,0.36,1)]
                                 group-hover:scale-y-0
                                 group-data-[state=open]:scale-y-0"
                />
                <span className="relative z-10 flex min-w-0 items-center gap-1 lg:gap-2">
                  <PlusSquare className="h-4 w-4 shrink-0 lg:h-8 lg:w-8" />
                  <span className="relative whitespace-nowrap">Dashboard</span>
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              collisionPadding={8}
              className="
                w-[calc(100vw-1rem)]
                max-w-72
                rounded-xl
                border border-white/5
                bg-black/80
                backdrop-blur-xs
                ring-1 ring-white/10
                shadow-[0_0_20px_rgba(245,158,11,0.25)]
                animate-in fade-in-0 zoom-in-95 slide-in-from-top-2
                duration-300
                sm:w-72
                sm:rounded-2xl
              "
            >
              <DropdownMenuLabel
                className="
                  border-b border-gray-300/30
                  px-3 py-3
                  font-playfairDisplay
                  sm:px-4 sm:py-4
                "
              >
                <div className="flex flex-col items-center gap-1 text-center">
                  <p className="text-lg text-gray-100 sm:text-xl">
                    Manage Videos
                  </p>

                  <p className="text-xs text-gray-100/60 sm:text-sm">
                    Choose a video format to manage.
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  goToVideoDashboardPage("/dashboard-landscape-videos");
                }}
                className="
                  group mx-1.5 mt-1.5
                  cursor-pointer rounded-md
                  px-2.5 py-2.5
                  font-playfairDisplay
                  text-sm font-medium text-gray-100
                  transition-all duration-200
                  data-[highlighted]:bg-amber-500/15
                  data-[highlighted]:text-white
                  data-[highlighted]:shadow-[0_0_20px_rgba(245,158,11,0.25)]
                  sm:mx-2 sm:mt-2
                  sm:px-3 sm:py-3
                  sm:text-base
                "
              >
                <MonitorPlay
                  className="
                    h-4 w-4 shrink-0
                    transition-colors duration-200
                    group-data-[highlighted]:stroke-white
                    sm:h-5 sm:w-5
                  "
                />
                Videos - Landscape
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  goToVideoDashboardPage("/dashboard-portrait-videos");
                }}
                className="
                  group mx-1.5 mt-1.5
                  cursor-pointer rounded-md
                  px-2.5 py-2.5
                  font-playfairDisplay
                  text-sm font-medium text-gray-100
                  transition-all duration-200
                  data-[highlighted]:bg-amber-500/15
                  data-[highlighted]:text-white
                  data-[highlighted]:shadow-[0_0_20px_rgba(245,158,11,0.25)]
                  sm:mx-2 sm:mt-2
                  sm:px-3 sm:py-3
                  sm:text-base
                "
              >
                <Smartphone
                  className="
                    h-4 w-4 shrink-0
                    transition-colors duration-200
                    group-data-[highlighted]:stroke-white
                    sm:h-5 sm:w-5
                  "
                />
                Shorts - Portrait
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                className="group h-9 w-9 p-0 shrink-0 cursor-pointer hover:[filter:drop-shadow(0_0_6px_orange)]
                           data-[state=open]:drop-shadow-[0_0_6px_orange]
                           data-[state=open]:cursor-pointer
                           lg:h-12 lg:w-12"
              >
                <Avatar className="h-9 w-9 lg:h-12 lg:w-12">
                  <AvatarFallback className="bg-amber-600 text-base font-bold text-black lg:text-xl">
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

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              collisionPadding={8}
              className="
                w-[calc(100vw-1rem)]
                max-w-56
                rounded-xl
                border border-white/5
                bg-black/80
                backdrop-blur-xs
                ring-1 ring-white/10
                shadow-[0_0_20px_rgba(245,158,11,0.25)]
                animate-in fade-in-0 zoom-in-95 slide-in-from-top-2
                duration-300
                sm:w-56
                sm:rounded-2xl
              "
            >
              <DropdownMenuLabel
                className="
                  border-b border-gray-300/30
                  px-3 py-5
                  font-playfairDisplay
                  sm:px-4 sm:py-8
                "
              >
                <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                  {session?.user?.name ? (
                    <>
                      <Avatar className="h-11 w-11 sm:h-14 sm:w-14">
                        <AvatarFallback
                          className="
                            bg-amber-600
                            text-lg font-bold text-black
                            sm:text-2xl
                          "
                        >
                          {session.user.name[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex min-w-0 flex-col items-center gap-1 text-center">
                        <p className="max-w-full truncate text-lg text-gray-100 sm:text-xl">
                          {session.user.name}
                        </p>

                        <p
                          className="
                            max-w-full break-all
                            text-sm text-gray-100/80
                            sm:text-base
                          "
                        >
                          {session.user.email}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Avatar className="h-11 w-11 sm:h-14 sm:w-14">
                        <AvatarFallback
                          className="
                            bg-amber-600
                            text-lg font-bold text-black
                            sm:text-2xl
                          "
                        >
                          <span
                            className="
                              h-5 w-5 animate-spin rounded-full
                              border-3 border-black/30 border-t-black
                              sm:h-6 sm:w-6
                            "
                          />
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col items-center gap-1 text-center">
                        <p className="text-lg text-gray-100 sm:text-xl">
                          Loading...
                        </p>

                        <p className="text-sm text-gray-100/80 sm:text-base">
                          Please wait
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </DropdownMenuLabel>

              <DropdownMenuItem
                onClick={handleSignOut}
                className="
                  group mx-1.5 my-1.5
                  cursor-pointer rounded-md
                  px-2.5 py-2.5
                  font-playfairDisplay
                  text-sm font-medium text-gray-100/80
                  transition-all duration-200
                  data-[highlighted]:bg-amber-500/15
                  data-[highlighted]:text-white
                  data-[highlighted]:shadow-[0_0_20px_rgba(245,158,11,0.25)]
                  sm:mx-2 sm:my-2
                  sm:px-3
                  sm:text-base
                "
              >
                <LogOut
                  className="
                    h-4 w-4 shrink-0
                    transition-colors duration-200
                    group-data-[highlighted]:stroke-white
                    sm:h-5 sm:w-5
                  "
                />
                Log out
              </DropdownMenuItem>

              {error && (
                <div
                  className="
                    mx-1.5 mb-1.5
                    rounded-md bg-destructive/15
                    p-2.5 text-xs text-destructive
                    sm:mx-2 sm:mb-2 sm:p-3 sm:text-sm
                  "
                >
                  {error}
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
}
