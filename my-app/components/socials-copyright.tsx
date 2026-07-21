import {
  FaCopyright,
  FaInstagram,
  FaSpotify,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";

export default function SocialsCopyright() {
  return (
    <section
      id="contact"
      className="border-t border-white/15 bg-black px-4 py-10 sm:px-6 sm:py-12"
    >
      <div className="container mx-auto flex min-w-0 flex-col items-center text-center font-roboto">
        <p className="max-w-full text-base leading-relaxed text-gray-300 sm:text-lg">
          {/* professionalvibemaster@stevensun.com */}
          Inquiries:{" "}
          <a
            href="mailto:jiasun0916@gmail.com"
            className="
              break-all text-amber-400 transition-colors duration-300
              hover:text-amber-300 hover:underline
              sm:break-normal
            "
          >
            jiasun0916@gmail.com
          </a>
        </p>

        <div className="flex min-h-18 flex-wrap items-center justify-center gap-4 py-4 sm:gap-5">
          <a
            href="https://www.youtube.com/@StevenVibemasterSun"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Steven Sun on YouTube"
            className="flex h-11 w-11 items-center justify-center text-gray-300"
          >
            <FaYoutube
              className="
                h-7 w-7 transition-all duration-300
                hover:-translate-y-1 hover:text-amber-400
                hover:[filter:drop-shadow(0_0_6px_gold)_drop-shadow(0_0_16px_gold)]
                sm:h-8 sm:w-8
              "
            />
          </a>

          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Steven Sun on Spotify"
            className="flex h-11 w-11 items-center justify-center text-gray-300"
          >
            <FaSpotify
              className="
                h-7 w-7 transition-all duration-300
                hover:-translate-y-1 hover:text-amber-400
                hover:[filter:drop-shadow(0_0_6px_gold)_drop-shadow(0_0_16px_gold)]
                sm:h-8 sm:w-8
              "
            />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Steven Sun on Instagram"
            className="flex h-11 w-11 items-center justify-center text-gray-300"
          >
            <FaInstagram
              className="
                h-7 w-7 transition-all duration-300
                hover:-translate-y-1 hover:text-amber-400
                hover:[filter:drop-shadow(0_0_6px_gold)_drop-shadow(0_0_16px_gold)]
                sm:h-8 sm:w-8
              "
            />
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Steven Sun on TikTok"
            className="flex h-11 w-11 items-center justify-center text-gray-300"
          >
            <FaTiktok
              className="
                h-7 w-7 transition-all duration-300
                hover:-translate-y-1 hover:text-amber-400
                hover:[filter:drop-shadow(0_0_6px_gold)_drop-shadow(0_0_16px_gold)]
                sm:h-8 sm:w-8
              "
            />
          </a>
        </div>

        <div className="flex max-w-full items-start justify-center gap-2 text-sm text-gray-300 sm:items-center sm:text-base">
          <FaCopyright className="mt-0.5 shrink-0 sm:mt-0" />

          <p className="leading-relaxed">
            2026 Steven Sun. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
