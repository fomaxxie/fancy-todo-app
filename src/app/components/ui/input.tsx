import * as React from "react";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "outline" | "error";
  size?: "sm" | "md" | "lg";
}

// Define the style variants
const inputStyles = {
  default: "border border-gray-300 focus:ring focus:ring-blue-500 focus:border-blue-500",
  outline: "border border-blue-500",
  error: "border border-red-600 text-red-600",
};

// Define size styles
const sizeStyles = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
};

// Update the Input component to forward the ref
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "default", size = "md", className = "", ...props }, ref) => {
    const variantClass = inputStyles[variant];
    const sizeClass = sizeStyles[size];

    return (
      <input
        ref={ref} // Forwarding the ref to the actual input element
        className={`${variantClass} ${sizeClass} rounded-md focus:outline-none transition ${className}`}
        {...props}
      />
    );
  }
);

// Optional: For better debugging, assign a display name
Input.displayName = "Input";

export { Input };
