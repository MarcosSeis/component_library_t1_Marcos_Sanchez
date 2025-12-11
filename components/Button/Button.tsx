"use client";

import { ButtonProps, ButtonSize, ButtonVariant } from "./Button.types";
import { trackEvent } from "@/lib/tracking";

export const Button = ({
  variant = "primary",
  size = "medium",
  state = "default",
  iconLeft,
  iconRight,
  children,
  onClick,
  className = "",
}: ButtonProps) => {
  const isDisabled = state === "disabled" || state === "loading";

  const handleClick = () => {
    if (isDisabled) return;

    trackEvent({
      component: "button",
      action: "click",
      variant,
      timestamp: Date.now(),
    });

    onClick?.();
  };

  const baseStyles = `
    flex items-center justify-center font-medium rounded-md transition-all
    focus:outline-none disabled:opacity-50 gap-2
  `;

  const sizes: Record<ButtonSize, string> = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-secondary text-black hover:bg-secondary-dark",
    danger: "bg-danger text-white hover:bg-danger-dark",
  };

  return (
    <button
      disabled={isDisabled}
      onClick={handleClick}
      className={`
        ${baseStyles}
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
    >
      {state === "loading" ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {iconLeft && <span>{iconLeft}</span>}
          <span>{children}</span>
          {iconRight && <span>{iconRight}</span>}
        </>
      )}
    </button>
  );
};
