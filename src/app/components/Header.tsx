"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/solution", label: "Solution" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm">
      <div className="max-w-7xl mx-auto cp-x py-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" aria-label="Homepage" className="flex-shrink-0">
            <img
              src="https://cdn.prod.website-files.com/679e441b90452288c5c37443/679e4609e7b123fb0460c97c_Logo_trainai.avif"
              alt="Logo"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-link text-lg hover:text-santra transition-colors duration-400 ease-[cubic-bezier(.25,.46,.45,.94)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-2">
            {/* Right buttons */}
            <div className="hidden sm:flex items-center space-x-4">
              <Link
                href="/contact"
                className="bg-background-b1 font-semibold text-lg cursor-pointer text-heading hover:bg-santra text-center rounded-[15px] px-7 py-2.5 leading-[1.4] transition-[background-color,transform, scale] duration-400 ease-[cubic-bezier(.25,.46,.45,.94)] hover:scale-[0.93]"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden flex font-semibold items-center cursor-pointer justify-center p-3 text-lg leading-none rounded-[15px] text-heading bg-background-b1 transition-[background-color,transform, scale] duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)] hover:scale-[0.96] ${
                isOpen && "bg-santra"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className="lg:hidden overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)]">
        <nav
          role="navigation"
          className={`transform transition-transform duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)] ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-100"
          } bg-background rounded-[15px] mt-[15px] mx-[30px] px-[5px] py-[15px] space-y-2`}
          data-nav-menu-open=""
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-link text-lg px-6 py-2 hover:text-santra transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)]"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
