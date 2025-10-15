"use client";

import { WhiteLogo } from "@/app/assets/index";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, User, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
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
  const [isSigningIn, setIsSigningIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Ref for the mobile menu container
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener when menu is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSignInClick = () => {
    setIsSigningIn(true);
    // The redirect will happen automatically via Clerk
    // We'll reset the loading state after a timeout in case something goes wrong
    setTimeout(() => {
      setIsSigningIn(false);
    }, 10000); // Reset after 10 seconds if still loading
  };

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

  const handleUserProfileClick = () => {
    setIsOpen(false);
    router.push("/my-profile");
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
                <button
                  onClick={handleSignInClick}
                  disabled={isSigningIn}
                  className="btn-primary disabled:opacity-70 disabled:cursor-not-allowed relative min-w-[100px] flex items-center justify-center"
                >
                  <span className={isSigningIn ? "opacity-0" : "opacity-100"}>
                    Sign In
                  </span>
                  {isSigningIn && (
                    <Loader2 className="h-4 w-4 animate-spin absolute" />
                  )}
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleUserProfileClick}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                  aria-label="My Profile"
                >
                  <User className="h-5 w-5 text-white" />
                </button>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden overflow-hidden ${!isOpen && "h-0"}`}
      >
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
          {/* Mobile User Profile Link */}
          <SignedIn>
            <button
              onClick={handleUserProfileClick}
              className="flex items-center gap-3 text-background text-lg px-6 py-2 hover:text-brand-br1 transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)] w-full text-left"
            >
              <User className="h-5 w-5" />
              My Profile
            </button>
          </SignedIn>
          {/* Mobile Sign In Button */}
          <SignedOut>
            <SignUpButton>
              <button
                onClick={handleSignInClick}
                disabled={isSigningIn}
                className="flex items-center gap-3 text-background text-lg px-6 py-2 hover:text-brand-br1 transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)] w-full text-left disabled:opacity-70"
              >
                {isSigningIn ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </SignUpButton>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
}
