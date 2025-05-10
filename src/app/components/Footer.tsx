import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-auto w-full z-50 py-20 pb-10 cp-x">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col md:flex-row gap-20 md:gap-10 justify-between">
        {/* Logo and Description */}
        <div className="flex-2 flex flex-col md:block justify-center items-center md:text-left mb-8">
          <Link href="/" aria-label="Homepage" className="flex-shrink-0">
            <img
              src="https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e4609e7b123fb0460c97c_Logo_trainai.avif"
              alt="Logo"
              className="h-8 w-auto mb-6"
            />
          </Link>
          <p className="text-link text-lg w-full max-w-2/3 md:text-left text-center">
            We develop cutting-edge AI training models to accelerate your
            innovation.
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
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/solution" className="hover:text-white">
                Solution
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Get started
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
        <div className="flex-1 text-center md:text-left">
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
        </div>
      </div>

      {/* Bottom credit */}
      <div className="my-20 text-center text-lg text-link">
        <p>
          Design by{" "}
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
          </a>
        </p>
      </div>
      <div className="glow-bottom"></div>
    </footer>
  );
}
