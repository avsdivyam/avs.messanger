"use client";

import { useState, useRef, useEffect } from "react";
import React from "react";
import { IconType } from "react-icons";

interface DropdownOption {
  label: string;
  value: string;
  icon?: IconType; // Optional icon component from react-icons
}

interface DropdownProps {
  options: DropdownOption[];
  onSelect: (value: string) => void;
  label?: string;
  className?: string;
}

/**
 * A flexible dropdown component with optional icons.
 *
 * @example
 * ```tsx
 * <Dropdown
 *   label="User"
 *   options={[
 *     { label: "Profile", value: "profile", icon: FaUser },
 *     { label: "Logout", value: "logout", icon: FiLogOut },
 *   ]}
 *   onSelect={(val) => console.log(val)}
 * />
 * ```
 */
export default function Dropdown({
  options,
  onSelect,
  label = "Select",
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
      >
        {label}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <ul className="py-1 text-sm text-gray-700">
            {options.map(({ label, value, icon: Icon }) => (
              <li
                key={value}
                onClick={() => {
                  onSelect(value);
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {Icon && <Icon className="w-4 h-4 text-gray-600" />}
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
