"use client";

import { OrangeLogo } from "@/app/assets/index";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// import LoginUser from "../ui/LoginUser";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const navLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/tokenomics", label: "Tokenomics" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".shadow-navbar", {
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "body",
        start: "top+=60", // starts after 60px scroll
        toggleActions: "play none none reverse", // fade in on scroll down, fade out on scroll up
      },
      duration: "1ms",
    });
  }, []);

  return (
    <header className="sticky top-0 z-30 text-background">
      {/* Shadow that appears on scroll */}
      <div className="shadow-navbar-light" aria-hidden="true"></div>

      <div className="mx-auto px-4 sm:px-4 lg:px-8 py-4 z-50 relative">
        <div className="flex items-center justify-between h-16">
          <div className="flex justify-center items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden flex sm:btn-primary ${
                isOpen && "bg-brand-br1"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
            {/* Logo */}
            <Link href="/" aria-label="Homepage" className="flex-shrink-0">
              <Image
                src={OrangeLogo}
                alt="Logo"
                className="h-5 sm:h-8 w-auto"
                width={150}
                height={50}
                priority
              />
            </Link>
          </div>
          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-background text-lg hover:text-brand-br1 transition-colors duration-400 ease-[cubic-bezier(.25,.46,.45,.94)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-1 sm:gap-4">
            {/* Right buttons */}
            {/* <LoginUser /> */}
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden overflow-hidden ${!isOpen && "h-0"}`}>
        <nav
          role="navigation"
          className={`transform transition-transform duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)] ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-100"
          } bg-forground rounded-[15px] mt-[15px] mx-[30px] px-[5px] py-[15px] space-y-2`}
          data-nav-menu-open=""
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-background text-lg px-6 py-2 hover:text-brand-br1 transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)]"
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
