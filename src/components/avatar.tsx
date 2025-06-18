interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
}

export function Avatar({ src, alt = "User", size = 40 }: AvatarProps) {
  return (
    <img
      src={src || "/default-avatar.png"}
      alt={alt}
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}
