"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WhiteLogo } from "@/app/assets/index";
import Image from "next/image";
import { usePrivy, useWallets } from "@privy-io/react-auth";

const navLinks = [
  // { href: "/", label: "Home" },
  // { href: "/about", label: "About" },
  // { href: "/solution", label: "Solution" },
  // { href: "/blog", label: "Blog" },
  // { href: "/contact", label: "Contact" },
  { href: "/", label: "Home" },
  { href: "/how", label: "How It Works" },
  { href: "/tokenomics", label: "Tokenomics" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { ready, authenticated, login, linkEmail } = usePrivy();
  const disableLogin = !ready || (ready && authenticated);

  const { connectWallet } = usePrivy();
  const { wallets } = useWallets();

  function handleDisconnectWallet() {
    console.log("disconnecting");
    wallets[0].disconnect;
  }

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
    <header className="sticky top-0 z-30">
      {/* Shadow that appears on scroll */}
      <div className="shadow-navbar" aria-hidden="true"></div>

      <div className="mx-auto px-4 sm:px-4 lg:px-8 py-4 z-50 relative">
        <div className="flex items-center justify-between h-16">
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
          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-link text-lg hover:text-brand-br1 transition-colors duration-400 ease-[cubic-bezier(.25,.46,.45,.94)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-2">
            {/* Right buttons */}
            <div className="flex items-center space-x-4">
              {wallets[0] ? (
                <Link
                  href="/my-profile"
                  className="bg-background-b1 font-semibold text-lg cursor-pointer text-heading hover:bg-brand-br1 text-center rounded-[15px] px-7 py-2.5 leading-[1.4] transition-[background-color,transform, scale] duration-400 ease-[cubic-bezier(.25,.46,.45,.94)] hover:scale-[0.93]"
                  onClick={handleDisconnectWallet}
                >
                  <div className="flex items-center">
                    {wallets[0].address.slice(0, 5) +
                      "...." +
                      wallets[0].address.slice(wallets[0].address.length - 2)}
                  </div>
                </Link>
              ) : (
                <div className="flex items-center">
                  <button
                    disabled={wallets[0]}
                    onClick={() =>
                      connectWallet({
                        walletChainType: "ethereum-only",
                        walletList: ["detected_ethereum_wallets"],
                      })
                    }
                    className="bg-background-b1 font-semibold text-lg cursor-pointer text-heading hover:bg-brand-br1 text-center rounded-[15px] px-7 py-2.5 leading-[1.4] transition-[background-color,transform, scale] duration-400 ease-[cubic-bezier(.25,.46,.45,.94)] hover:scale-[0.93]"
                  >
                    Connect
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {authenticated ? (
                <Link
                  href="/my-profile"
                  className="bg-background-b1 font-semibold text-lg cursor-pointer text-heading hover:bg-brand-br1 text-center rounded-[15px] px-7 py-2.5 leading-[1.4] transition-[background-color,transform, scale] duration-400 ease-[cubic-bezier(.25,.46,.45,.94)] hover:scale-[0.93]"
                >
                  <div className="flex items-center">
                    <User />
                  </div>
                </Link>
              ) : (
                <div className="flex items-center">
                  <button
                    disabled={disableLogin}
                    onClick={login}
                    className="bg-background-b1 font-semibold text-lg cursor-pointer text-heading hover:bg-brand-br1 text-center rounded-[15px] px-7 py-2.5 leading-[1.4] transition-[background-color,transform, scale] duration-400 ease-[cubic-bezier(.25,.46,.45,.94)] hover:scale-[0.93]"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/cart"
                className="bg-background-b1 font-semibold text-lg cursor-pointer text-heading hover:bg-brand-br1 text-center rounded-[15px] px-7 py-2.5 leading-[1.4] transition-[background-color,transform, scale] duration-400 ease-[cubic-bezier(.25,.46,.45,.94)] hover:scale-[0.93]"
              >
                <div className="flex items-center">
                  <ShoppingCart />
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden flex font-semibold items-center cursor-pointer justify-center p-3 text-lg leading-none rounded-[15px] text-heading bg-background-b1 transition-[background-color,transform, scale] duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)] hover:scale-[0.96] ${
                isOpen && "bg-brand-br1"
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
      <div className={`lg:hidden overflow-hidden ${!isOpen && "h-0"}`}>
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
              className="block text-link text-lg px-6 py-2 hover:text-brand-br1 transition-colors duration-[400ms] ease-[cubic-bezier(.25,.46,.45,.94)]"
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
