"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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

  return (
    <nav
      className={`w-full bg-blue-600 text-white px-6 py-3 shadow-md flex justify-between items-center ${className}`}
    >
      {/* Brand (text or logo) */}
      <div className="text-lg font-bold">
        <Link href="/" className="flex items-center gap-2">
          {brandName}
        </Link>
      </div>

      {/* Navigation links */}
      <ul className="flex gap-6">
        {navItems.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={`hover:underline ${
                pathname === href ? "font-semibold underline" : ""
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Optional right content */}
      {rightItems && <div className="flex items-center">{rightItems}</div>}
    </nav>
  );
}
