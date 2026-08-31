"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Mountain } from "lucide-react";

const navbarData = {
  links: [
    { name: "HOME", href: "/#home" },
    { name: "ABOUT", href: "/#about" },
    { name: "PROGRAMS", href: "/#programs" },
    { name: "SERVICES", href: "/#services" },
    { name: "COACHES", href: "/#coaches" },
    { name: "TRANSFORMATIONS", href: "/#transformations" },
    { name: "MEMBERSHIP", href: "/#pricing" },
    { name: "GALLERY", href: "/#gallery" },
    { name: "CONTACT", href: "/#contact" },
  ],
  cta: "BOOK ASSESSMENT"
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navbar = navbarData;

  // Track active link (hardcoded for now, can be dynamic later)
  const activeLink = "HOME";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Initialize immediately on mount
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed w-full z-50 top-0 left-0">
      {/* 
        We use a separate absolute div for the background that only toggles opacity. 
        This prevents the browser's compositing engine from "breaking" or glitching 
        the backdrop-blur when switching classes. 
      */}
      <div
        className={`absolute inset-0 bg-[#050505]/60 backdrop-blur-2xl border-b border-white/10 shadow-lg transition-opacity duration-300 pointer-events-none ${isScrolled ? "opacity-100" : "opacity-0"
          }`}
      />

      <nav className="w-full h-[72px] flex items-center px-4 md:px-8 lg:px-12 relative z-10">

        {/* Left: Brand / Logo */}
        <div className="flex-1 flex justify-start">
          <Link 
            href="/#home" 
            className="flex items-center gap-3 group"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <img src="/logo.png" alt="FabFit Logo" className="h-10 md:h-12 w-auto object-contain" />
          </Link>
        </div>

        {/* Center: Desktop Links */}
        <div className="hidden lg:flex flex-[2] items-center justify-center gap-5 xl:gap-8 h-full">
          {navbar.links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => {
                if ((link.href === "/" || link.href === "/#home") && window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="group text-[11px] font-bold tracking-widest uppercase transition-colors duration-300 flex items-center h-full text-zinc-400 hover:text-primary"
            >
              <span className="relative">
                {link.name}
                {/* Hover Underline */}
                <span className="absolute -bottom-1.5 left-0 w-full flex justify-center">
                  <span className="h-[2px] bg-primary rounded-full transition-all duration-300 ease-out w-0 group-hover:w-full" />
                </span>
              </span>
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex justify-end items-center h-full">
          {/* Desktop CTA */}
          <Link
            href="/assessment"
            target="_blank"
            className="hidden lg:flex group items-center justify-center h-[42px] px-6 bg-transparent border border-primary text-primary hover:bg-primary hover:text-black text-[12px] font-bold tracking-wide uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] rounded-md"
          >
            {navbar.cta}
            <ArrowRight className="ml-2 h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 -mr-2 text-white hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl overflow-hidden">
          <div className="px-6 py-8 flex flex-col gap-6">
            {navbar.links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    setIsOpen(false);
                    if ((link.href === "/" || link.href === "/#home") && window.location.pathname === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`text-sm font-bold tracking-widest uppercase transition-colors ${activeLink === link.name ? "text-primary" : "text-white"
                    }`}
                >
                {link.name}
              </Link>
            ))}
            <Link
              href="/assessment"
              target="_blank"
              onClick={() => setIsOpen(false)}
              className="mt-6 flex items-center justify-center h-12 bg-transparent border border-primary text-primary hover:bg-primary hover:text-black text-sm font-bold tracking-wide uppercase transition-all rounded-md"
            >
              {navbar.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
