"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

/**
 * Represents a single navigation item in the navbar.
 */
export interface NavItem {
  /** Label to display */
  label: string;
  /** URL path to navigate to */
  href: string;
}

/**
 * Props for the reusable Navbar component.
 */
interface NavbarProps {
  /**
   * The brand name, logo, or custom ReactNode shown on the left.
   * Can be a string, image, or JSX.
   * @default "app-name"
   */
  brandName?: React.ReactNode;

  /**
   * Array of navigation items to be shown in the center.
   */
  navItems: NavItem[];

  /**
   * Optional React node to be rendered on the right side
   * (e.g., profile, logout button).
   */
  rightItems?: React.ReactNode;

  /**
   * Optional className to override or extend default styling.
   */
  className?: string;
}

/**
 * `Navbar` is a flexible and reusable navigation component.
 *
 * It accepts navigation items and renders them with active path highlighting.
 * It also supports branding (text/logo) and optional right-side content.
 *
 * @example
 * ```tsx
 * <Navbar
 *   brandName={
 *     <div className="flex items-center gap-2">
 *       <img src="/logo.svg" alt="Logo" className="h-6" />
 *       <span>Messenger</span>
 *     </div>
 *   }
 *   navItems={[
 *     { label: "Home", href: "/" },
 *     { label: "Profile", href: "/profile" },
 *   ]}
 *   rightItems={<LogoutButton />}
 * />
 * ```
 */
export default function Navbar({
  brandName = "app-name",
  navItems,
  rightItems,
  className = "",
}: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`w-full ${className}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand (text or logo) */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {brandName}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    pathname === href
                      ? "text-white bg-white/20"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right Items */}
          <div className="hidden md:block">
            {rightItems && <div className="flex items-center space-x-4">{rightItems}</div>}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-black/40 backdrop-blur-md border-t border-white/10">
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                pathname === href
                  ? "text-white bg-white/20"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          
          {/* Mobile Right Items */}
          {rightItems && (
            <div className="pt-4 pb-3 border-t border-white/10">
              <div className="flex items-center px-3 space-y-2 flex-col">
                {rightItems}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
