import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "success" | "danger" | "neutral" | "accent";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700",
  success: "bg-green-600 hover:bg-green-700",
  danger: "bg-red-600 hover:bg-red-700",
  neutral: "bg-gray-400 hover:bg-gray-500",
  accent: "bg-violet-600 hover:bg-violet-700",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`p-2 text-white font-semibold rounded-md ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}