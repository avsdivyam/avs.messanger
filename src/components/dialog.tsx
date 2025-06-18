"use client";

import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  showOverlay?: boolean;
  className?: string;
}

/**
 * Dialog component — a controlled, reusable modal with optional title, overlay, and children.
 *
 * @example
 * <Dialog isOpen={open} onClose={() => setOpen(false)} title="Confirm Delete">
 *   <p>Are you sure?</p>
 * </Dialog>
 */
export default function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  showOverlay = true,
  className = "",
}: DialogProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {showOverlay && (
        <div
          className="absolute inset-0 bg-black bg-opacity-40"
          onClick={onClose}
        />
      )}
      <div
        className={`relative z-50 w-full max-w-md bg-white rounded-lg shadow-lg p-6 animate-fadeIn ${className}`}
      >
        {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
        {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
        {children}
      </div>
    </div>,
    document.body
  );
}



// @keyframes fadeIn {
//   0% {
//     transform: scale(0.95);
//     opacity: 0;
//   }
//   100% {
//     transform: scale(1);
//     opacity: 1;
//   }
// }

// .animate-fadeIn {
//   animation: fadeIn 0.2s ease-out;
// }
