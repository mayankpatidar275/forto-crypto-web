import { WhiteLogo } from "@/app/assets";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-auto w-full z-50 py-20 pb-10 cp-x">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col md:flex-row gap-20 md:gap-10 justify-between">
        {/* Logo and Description */}
        <div className="flex-2 flex flex-col md:block justify-center items-center md:text-left mb-8">
          {/* Logo */}
          <Link href="/" aria-label="Homepage" className="flex-shrink-0">
            <Image
              // src="https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e4609e7b123fb0460c97c_Logo_trainai.avif"
              // src={OrangeLogo}
              src={WhiteLogo}
              alt="Logo"
              // className="h-8 w-auto"
              width={150}
              height={50}
              priority
            />
          </Link>
          <p className="text-link text-lg w-full max-w-2/3 md:text-left text-center mt-4">
            Forto token
            <br />
            Fair. Smart. Rewarding
            <br />
            <br />
            <a
              href="mailto:contact@yourdomain.com"
              className="hover:text-white"
            >
              contact@yourdomain.com
            </a>
          </p>
        </div>

        {/* Sitemap */}
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-semibold mb-8">Sitemap</h4>
          <ul className="space-y-2 text-link text-md">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/how" className="hover:text-white">
                How it works
              </Link>
            </li>
            <li>
              <Link href="/tokenomics" className="hover:text-white">
                Tokenomics
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-semibold mb-8">Social</h4>
          <ul className="space-y-2 text-link text-md">
            <li>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                YouTube
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                X
              </a>
            </li>
          </ul>
        </div>

        {/* Utility Links */}
        {/* <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-semibold mb-8">Links</h4>
          <ul className="space-y-2 text-link text-md">
            <li>
              <Link href="/template/styleguide" className="hover:text-white">
                Styleguide
              </Link>
            </li>
            <li>
              <Link href="/template/licensing" className="hover:text-white">
                Licensing
              </Link>
            </li>
            <li>
              <Link href="/template/changelog" className="hover:text-white">
                Changelog
              </Link>
            </li>
          </ul>
        </div> */}
      </div>

      {/* Bottom credit */}
      <div className="my-20 text-center text-lg text-link">
        <p>
          © 2025 Forto
          {/* Design by{" "}
          <a
            href="https://www.monsieursel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Monsieur Sel
          </a>{" "}
          – Powered by{" "}
          <a
            href="https://webflow.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Webflow
          </a> */}
        </p>
      </div>
      <div className="glow-bottom"></div>
    </footer>
  );
}
