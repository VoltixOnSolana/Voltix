// components/ui/button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all ${
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      } ${props.className || ""}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};