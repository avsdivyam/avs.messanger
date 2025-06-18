"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import React from "react";

interface MenuItem {
  label: string;
  href: string;
  icon?: IconType; // Icon from react-icons
}

interface MenuProps {
  items: MenuItem[];
  className?: string;
  activeClassName?: string;
}

/**
 * A vertical menu component with optional icons and active link highlighting.
 *
 * @example
 * ```tsx
 * <Menu
 *   items={[
 *     { label: "Dashboard", href: "/dashboard", icon: FiHome },
 *     { label: "Settings", href: "/settings", icon: FiSettings },
 *   ]}
 * />
 * ```
 */
export default function Menu({
  items,
  className = "",
  activeClassName = "bg-blue-100 text-blue-600 font-medium",
}: MenuProps) {
  const pathname = usePathname();

  return (
    <ul className={`flex flex-col gap-1 ${className}`}>
      {items.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <li key={href}>
            <Link
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 transition ${
                isActive ? activeClassName : "text-gray-700"
              }`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
