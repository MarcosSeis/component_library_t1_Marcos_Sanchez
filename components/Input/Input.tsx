"use client";

import { InputProps } from "./Input.types";
import { trackEvent } from "@/lib/tracking";

export const Input = ({
  label,
  type = "text",
  value,
  placeholder,
  state = "default",
  iconLeft,
  iconRight,
  helperText,
  className = "",
  onChange,
}: InputProps) => {
  const isDisabled = state === "disabled";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;

    onChange?.(e.target.value);

    trackEvent({
      component: "input",
      action: "change",
      type,
      state,
      value: e.target.value,
      timestamp: Date.now(),
    });
  };

  const stateStyles: Record<string, string> = {
    default: "border-gray-300 focus:border-primary hover:border-gray-400",
    error: "border-danger focus:border-danger-dark",
    success: "border-green-600 focus:border-green-700",
    disabled: "bg-gray-200 border-gray-300 cursor-not-allowed opacity-70",
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="relative w-full">
        {iconLeft && (
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            {iconLeft}
          </span>
        )}

        <input
          type={type}
          disabled={isDisabled}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={`
            w-full rounded-md border px-3 py-2 transition-all
            text-gray-700 bg-white
            focus:outline-none focus:ring-2 focus:ring-primary/20
            ${stateStyles[state]}
            ${iconLeft ? "pl-10" : ""}
            ${iconRight ? "pr-10" : ""}
          `}
        />

        {iconRight && (
          <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">
            {iconRight}
          </span>
        )}
      </div>

      {helperText && (
        <span
          className={`text-sm ${
            state === "error"
              ? "text-danger"
              : state === "success"
              ? "text-green-700"
              : "text-gray-600"
          }`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};
