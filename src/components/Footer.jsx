import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-3xl font-extrabold text-transparent">
              Life Lessons
            </h2>

            <p className="mt-4 text-sm leading-6 text-zinc-400">
              Share your experiences, learn from others, and build a
              collection of meaningful life lessons that inspire growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-zinc-400 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/lessons"
                className="text-zinc-400 transition hover:text-white"
              >
                Lessons
              </Link>

              <Link
                href="/pricing"
                className="text-zinc-400 transition hover:text-white"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Legal
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="#"
                className="text-zinc-400 transition hover:text-white"
              >
                Terms & Conditions
              </Link>

              <Link
                href="#"
                className="text-zinc-400 transition hover:text-white"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact
            </h3>

            <p className="text-zinc-400">
              support@lifelessons.com
            </p>

            <p className="mt-2 text-zinc-400">
              Dhaka, Bangladesh
            </p>

            {/* Social */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                className="rounded-full border border-zinc-800 p-3 text-zinc-400 transition hover:border-violet-500 hover:text-white"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="rounded-full border border-zinc-800 p-3 text-zinc-400 transition hover:border-violet-500 hover:text-white"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="rounded-full border border-zinc-800 p-3 text-zinc-400 transition hover:border-violet-500 hover:text-white"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="rounded-full border border-zinc-800 p-3 text-zinc-400 transition hover:border-violet-500 hover:text-white"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-sm text-zinc-500">
            © {new Date().getFullYear()} Life Lessons. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}