"use client";

import { WhiteLogo } from "@/app/assets/index";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "#how-it-works", label: "How" },
  { href: "#faq", label: "FAQ" },
  { href: "#footer", label: "Contact" },
  { href: "/6thstreet", label: "For Brands" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);

    if (href.startsWith("#")) {
      // Handle section scrolling
      if (pathname === "/") {
        // On home page, scroll to section
        const sectionId = href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // On other pages, navigate to home page with hash
        router.push(`/${href}`);
      }
    }
    // For regular links, the Link component will handle navigation
    else {
      router.push(`${href}`);
    }
  };

  return (
    <header
      id="header"
      className={`top-0 z-30 w-full fixed transition-colors duration-300 ${
        scrolled ? "bg-background shadow-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-4 lg:px-8 py-0 sm:py-4 z-50 relative">
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
                src={WhiteLogo}
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
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-white text-lg hover:text-brand-br1 transition-colors duration-400 ease-[cubic-bezier(.25,.46,.45,.94)]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex gap-1 sm:gap-4">
            <SignedOut>
              <SignUpButton>
                <button className="btn-primary">Sign Up/In</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <SignOutButton />
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
          } bg-very-light-pink py-2`}
          data-nav-menu-open=""
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block text-background text-lg px-6 py-2 hover:text-brand-br1 transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)] w-full text-left"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
