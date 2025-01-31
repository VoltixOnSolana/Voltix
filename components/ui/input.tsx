// components/ui/input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-400 mb-2">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          props.className || ""
        }`}
      />
    </div>
  );
};