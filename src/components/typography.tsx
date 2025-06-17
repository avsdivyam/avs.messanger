import React, { JSX } from "react";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle"
  | "body"
  | "caption"
  | "small";

interface TypographyProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

/**
 * Typography component for consistent text styles.
 *
 * @example
 * <Typography variant="h1">Welcome</Typography>
 * <Typography variant="body" className="text-gray-600">Description text</Typography>
 */
export default function Typography({
  children,
  variant = "body",
  className = "",
}: TypographyProps) {
  const baseClasses = "text-gray-900";
  const variants: Record<Variant, string> = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-semibold",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-medium",
    h5: "text-lg font-medium",
    h6: "text-base font-medium",
    subtitle: "text-sm text-gray-500",
    body: "text-base",
    caption: "text-xs text-gray-500",
    small: "text-xs",
  };

  // Map each variant to a valid HTML tag
  const tagMap: Record<Variant, keyof JSX.IntrinsicElements> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    subtitle: "p",
    body: "p",
    caption: "span",
    small: "small",
  };

  const Tag = tagMap[variant];

  return (
    <Tag className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </Tag>
  );
}
