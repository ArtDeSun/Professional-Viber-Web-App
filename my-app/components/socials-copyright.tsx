import Link from "next/link";
import { FaFacebook, FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa";

export default function SocialsCopyright() {
  return (
    <section id="contact" className="border-t bg-black py-12">
      <div className="container mx-auto px-4 text-center font-roboto">
        <p className="text-lg text-gray-300">
          Inquiries:{" "}
          <span className="text-amber-400">
            professionalvibemaster@stevensun.com
          </span>
        </p>
        <div className="mx-auto flex items-center justify-center h-18 gap-5">
          <Link
            href="https://youtube.com"
            target="_blank"
            className="text-gray-300"
          >
            <FaYoutube
              className="h-8 w-8 transition-all duration-300
              hover:-translate-y-1 
              hover:text-amber-400
              hover:[filter:drop-shadow(0_0_6px_gold)_drop-shadow(0_0_16px_gold)]"
            />
          </Link>
          <Link
            href="https://spotify.com"
            target="_blank"
            className="text-gray-300"
          >
            <FaSpotify
              className="h-8 w-8 transition-all duration-300
              hover:-translate-y-1 
              hover:text-amber-400
              hover:[filter:drop-shadow(0_0_6px_gold)_drop-shadow(0_0_16px_gold)]"
            />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="text-gray-300"
          >
            <FaInstagram
              className="h-8 w-8 transition-all duration-300
              hover:-translate-y-1 
              hover:text-amber-400
              hover:[filter:drop-shadow(0_0_6px_gold)_drop-shadow(0_0_16px_gold)]"
            />
          </Link>
          <Link
            href="https://facebook.com"
            target="_blank"
            className="text-gray-300"
          >
            <FaFacebook
              className="h-8 w-8 transition-all duration-300
              hover:-translate-y-1 
              hover:text-amber-400
              hover:[filter:drop-shadow(0_0_6px_gold)_drop-shadow(0_0_16px_gold)]"
            />
          </Link>
        </div>
        <p className="text-gray-300">Copyright 2026 by Steven Sun</p>
      </div>
    </section>
  );
}
