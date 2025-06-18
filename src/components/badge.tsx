interface BadgeProps {
  label: string;
  color?: "green" | "red" | "blue" | "gray";
}

export function Badge({ label, color = "gray" }: BadgeProps) {
  const colors = {
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
    gray: "bg-gray-100 text-gray-700",
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${colors[color]}`}>
      {label}
    </span>
  );
}
