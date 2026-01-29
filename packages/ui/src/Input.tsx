import React from "react";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "prefix"
> {
  label?: string;
  error?: string;
  inputPrefix?: React.ReactNode;
}

export function Input({
  label,
  error,
  inputPrefix,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {inputPrefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {inputPrefix}
          </span>
        )}
        <input
          id={inputId}
          className={`w-full ${inputPrefix ? "pl-8" : "pl-4"} pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
            error ? "border-red-500" : "border-gray-300"
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
