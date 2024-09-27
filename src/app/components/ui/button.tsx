import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
}

const buttonStyles = {
  default: "bg-blue-500 text-white",
  outline: "border border-blue-500 text-blue-500",
  destructive: "bg-red-600 text-white",
};

const sizeStyles = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
};

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const variantClass = buttonStyles[variant];
  const sizeClass = sizeStyles[size];

  return (
    <button
      className={`${variantClass} ${sizeClass} rounded-md font-medium transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
