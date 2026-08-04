// components/landing/hero-descriptions-section.tsx
// SERVER COMPONENT

import { AudioLines, Ear, Video } from "lucide-react";
import DescriptionBackgroundSlider from "./description-background-slider";

export default function HeroDescriptionsSection() {
  return (
    <section
      id="description-cards"
      className="
            relative overflow-hidden
            border-t border-white/15
            bg-neutral-950
            py-28
            sm:py-32
            md:py-36
          "
    >
      <DescriptionBackgroundSlider />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-5 md:px-6">
        <div
          className="
                grid items-stretch
                gap-4
                font-redHatDisplay
                sm:gap-5
                md:grid-cols-3 md:gap-4
                lg:gap-6
              "
        >
          {/* Teaching */}
          <div className="group relative h-full">
            {/* Hidden layers */}
            <div
              className="
                    absolute inset-0
                    translate-x-1.5 -translate-y-2
                    rounded-2xl
                    bg-gradient-to-br
                    from-amber-400/80 via-yellow-300/80 to-orange-400/80
                    transition-all duration-300
                    sm:translate-x-2 sm:-translate-y-3 sm:rounded-3xl
                    md:translate-x-3 md:-translate-y-4
                  "
            />

            <div
              className="
                    absolute inset-0
                    translate-x-0.5 -translate-y-1
                    rounded-2xl
                    bg-gradient-to-br
                    from-amber-300 via-yellow-200 to-orange-300
                    transition-all duration-300
                    sm:translate-x-1 sm:-translate-y-1.5 sm:rounded-3xl
                    md:translate-x-1.5 md:-translate-y-2
                  "
            />

            {/* Main card */}
            <div
              className="
                    relative z-10
                    flex h-full flex-col
                    rounded-2xl
                    border border-amber-300/50
                    bg-gradient-to-br
                    from-amber-200 via-yellow-100 to-orange-200
                    p-3
                    ring-1 ring-amber-300/50
                    transition-all duration-300
                    sm:rounded-3xl sm:p-4
                    md:p-3
                    lg:p-5
                    lg:hover:-translate-y-2
                    active:-translate-y-2
                    lg:hover:shadow-[0_0_36px_rgba(245,158,11,0.95)]
                    active:shadow-[0_0_36px_rgba(245,158,11,0.95)]
                    xl:p-6
                  "
            >
              <div
                className="
                      mb-3 inline-flex
                      h-10 w-10
                      items-center justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-amber-500 via-yellow-300 to-orange-100
                      ring-1 ring-amber-300/50
                      shadow-[0_0_16px_rgba(245,158,11,0.8)]
                      sm:mb-4 sm:h-12 sm:w-12 sm:rounded-2xl
                      md:mb-5 md:h-14 md:w-14
                      md:shadow-[0_0_24px_rgba(245,158,11,0.95)]
                    "
              >
                <Ear className="h-5 w-5 text-amber-800 sm:h-6 sm:w-6 md:h-7 md:w-7" />
              </div>

              <h3
                className="
                      mb-2
                      font-marcellus
                      text-xl font-bold
                      leading-tight text-gray-700
                      sm:mb-3 sm:text-2xl
                      md:text-xl
                      lg:text-2xl
                      xl:text-3xl
                    "
              >
                Innovative Piano Learning
              </h3>

              <p
                className="
                      mt-auto
                      text-sm font-semibold
                      leading-relaxed
                      text-muted-foreground
                      sm:text-base
                      md:text-sm
                      lg:text-base
                      xl:text-lg
                    "
              >
                Practice theory with <span className="font-black">Steven</span>{" "}
                through real songs, ear training, and inspired playing from day
                one.
              </p>
            </div>
          </div>

          {/* Content Creation */}
          <div className="group relative h-full">
            {/* Hidden layers */}
            <div
              className="
                    absolute inset-0
                    translate-x-1.5 -translate-y-2
                    rounded-2xl
                    bg-gradient-to-br
                    from-violet-400/80 via-purple-300/80 to-fuchsia-400/80
                    transition-all duration-300
                    sm:translate-x-2 sm:-translate-y-3 sm:rounded-3xl
                    md:translate-x-3 md:-translate-y-4
                  "
            />

            <div
              className="
                    absolute inset-0
                    translate-x-0.5 -translate-y-1
                    rounded-2xl
                    bg-gradient-to-br
                    from-violet-300 via-purple-200 to-fuchsia-300
                    transition-all duration-300
                    sm:translate-x-1 sm:-translate-y-1.5 sm:rounded-3xl
                    md:translate-x-1.5 md:-translate-y-2
                  "
            />

            {/* Main card */}
            <div
              className="
                    relative z-10
                    flex h-full flex-col
                    rounded-2xl
                    border border-violet-300/50
                    bg-gradient-to-br
                    from-violet-200 via-purple-100 to-fuchsia-200
                    p-3
                    ring-1 ring-violet-300/50
                    transition-all duration-300
                    sm:rounded-3xl sm:p-4
                    md:p-3
                    lg:p-5
                    lg:hover:-translate-y-2
                    active:-translate-y-2
                    lg:hover:shadow-[0_0_36px_rgba(139,92,246,0.95)]
                    active:shadow-[0_0_36px_rgba(139,92,246,0.95)]
                    xl:p-6
                  "
            >
              <div
                className="
                      mb-3 inline-flex
                      h-10 w-10
                      items-center justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-violet-500 via-purple-300 to-fuchsia-100
                      ring-1 ring-violet-300/50
                      shadow-[0_0_16px_rgba(139,92,246,0.8)]
                      sm:mb-4 sm:h-12 sm:w-12 sm:rounded-2xl
                      md:mb-5 md:h-14 md:w-14
                      md:shadow-[0_0_24px_rgba(139,92,246,0.95)]
                    "
              >
                <Video className="h-5 w-5 text-violet-800 sm:h-6 sm:w-6 md:h-7 md:w-7" />
              </div>

              <h3
                className="
                      mb-2
                      font-marcellus
                      text-xl font-bold
                      leading-tight text-gray-700
                      sm:mb-3 sm:text-2xl
                      md:text-xl
                      lg:text-2xl
                      xl:text-3xl
                    "
              >
                Professional Vibemaster
              </h3>

              <p
                className="
                      mt-auto
                      text-sm font-semibold
                      leading-relaxed
                      text-muted-foreground
                      sm:text-base
                      md:text-sm
                      lg:text-base
                      xl:text-lg
                    "
              >
                Crafting immersive musical experiences through performance,
                personality, and digital storytelling.
              </p>
            </div>
          </div>

          {/* Musicianship */}
          <div className="group relative h-full">
            {/* Hidden layers */}
            <div
              className="
                    absolute inset-0
                    translate-x-1.5 -translate-y-2
                    rounded-2xl
                    bg-gradient-to-br
                    from-rose-400/80 via-pink-300/80 to-red-400/80
                    transition-all duration-300
                    sm:translate-x-2 sm:-translate-y-3 sm:rounded-3xl
                    md:translate-x-3 md:-translate-y-4
                  "
            />

            <div
              className="
                    absolute inset-0
                    translate-x-0.5 -translate-y-1
                    rounded-2xl
                    bg-gradient-to-br
                    from-rose-300 via-pink-200 to-red-300
                    transition-all duration-300
                    sm:translate-x-1 sm:-translate-y-1.5 sm:rounded-3xl
                    md:translate-x-1.5 md:-translate-y-2
                  "
            />

            {/* Main card */}
            <div
              className="
                    relative z-10
                    flex h-full flex-col
                    rounded-2xl
                    border border-rose-300/50
                    bg-gradient-to-br
                    from-rose-200 via-pink-100 to-red-200
                    p-3
                    ring-1 ring-rose-300/50
                    transition-all duration-300
                    sm:rounded-3xl sm:p-4
                    md:p-3
                    lg:p-5
                    lg:hover:-translate-y-2
                    active:-translate-y-2
                    lg:hover:shadow-[0_0_36px_rgba(244,63,94,0.95)]
                    active:shadow-[0_0_36px_rgba(244,63,94,0.95)]
                    xl:p-6
                  "
            >
              <div
                className="
                      mb-3 inline-flex
                      h-10 w-10
                      items-center justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-rose-500 via-pink-300 to-red-100
                      ring-1 ring-rose-300/50
                      shadow-[0_0_16px_rgba(244,63,94,0.8)]
                      sm:mb-4 sm:h-12 sm:w-12 sm:rounded-2xl
                      md:mb-5 md:h-14 md:w-14
                      md:shadow-[0_0_24px_rgba(244,63,94,0.95)]
                    "
              >
                <AudioLines className="h-5 w-5 text-rose-700 sm:h-6 sm:w-6 md:h-7 md:w-7" />
              </div>

              <h3
                className="
                      mb-2
                      font-marcellus
                      text-xl font-bold
                      leading-tight text-gray-700
                      sm:mb-3 sm:text-2xl
                      md:text-xl
                      lg:text-2xl
                      xl:text-3xl
                    "
              >
                Genre-Spanning Creativity
              </h3>

              <p
                className="
                      mt-auto
                      text-sm font-semibold
                      leading-relaxed
                      text-muted-foreground
                      sm:text-base
                      md:text-sm
                      lg:text-base
                      xl:text-lg
                    "
              >
                Internalizing classical, jazz, R&amp;B, rock, and East-Asian pop
                into a distinctively creative voice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
