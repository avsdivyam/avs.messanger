"use client";

import Link from "next/link";
import React from "react";

/**
 * Props for the Footer component.
 */
interface FooterProps {
  /**
   * Optional array of footer links (e.g., About, Contact).
   */
  links?: { label: string; href: string }[];

  /**
   * Optional custom content or components on the right.
   */
  rightContent?: React.ReactNode;

  /**
   * Footer brand text or logo.
   * @default "© 2025 MyApp"
   */
  brand?: React.ReactNode;

  /**
   * Optional custom className for styling.
   */
  className?: string;
}

/**
 * `Footer` is a flexible and reusable component typically placed at the bottom of the page.
 *
 * It supports left-aligned brand/logo, center navigation links, and optional right-side content.
 *
 * @example
 * ```tsx
 * <Footer
 *   brand="© 2025 Messenger"
 *   links={[
 *     { label: "Privacy", href: "/privacy" },
 *     { label: "Terms", href: "/terms" },
 *   ]}
 *   rightContent={<LanguageSwitcher />}
 * />
 * ```
 */
export default function Footer({
  links = [],
  rightContent,
  brand = "© 2025 MyApp",
  className = "",
}: FooterProps) {
  return (
    <footer
      className={`w-full bg-gray-800 text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 ${className}`}
    >
      {/* Left: Brand or logo */}
      <div className="text-sm text-center md:text-left">{brand}</div>

      {/* Center: Navigation Links */}
      {links.length > 0 && (
        <ul className="flex flex-wrap justify-center gap-4 text-sm">
          {links.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className="hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Right: Optional Content */}
      {rightContent && <div className="text-sm">{rightContent}</div>}
    </footer>
  );
}
