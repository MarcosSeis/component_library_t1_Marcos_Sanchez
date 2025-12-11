"use client";

import { CardProps, CardVariant } from "./Card.types";
import { useEffect } from "react";
import { trackEvent } from "@/lib/tracking";

export const Card = ({
  image,
  title,
  children,
  footer,
  variant = "default",
  onClick,
  className = "",
}: CardProps) => {
  
  // Track card view when mounted
  useEffect(() => {
    trackEvent({
      component: "card",
      action: "view",
      variant,
      timestamp: Date.now(),
    });
  }, [variant]);

  const handleClick = () => {
    trackEvent({
      component: "card",
      action: "click",
      variant,
      timestamp: Date.now(),
    });

    onClick?.();
  };

  const variants: Record<CardVariant, string> = {
    default: "border border-gray-300",
    subtle: "border border-gray-200 shadow-sm",
    strong: "border-2 border-gray-400 shadow-md",
  };

  return (
    <div
      className={`
        rounded-xl bg-white overflow-hidden cursor-pointer
        transition-transform hover:scale-[1.01]
        ${variants[variant]}
        ${className}
      `}
      onClick={handleClick}
      data-testid="card"
    >
      {/* Image */}
      {image && (
        <img
          src={image}
          alt={title || "card image"}
          className="w-full h-40 object-cover"
        />
      )}

      {/* Header */}
      {title && (
        <div className="px-4 pt-4 text-lg font-semibold text-gray-900">
          {title}
        </div>
      )}

      {/* Body */}
      <div className="px-4 py-4 text-gray-700">{children}</div>

      {/* Footer */}
      {footer && <div className="px-4 py-4">{footer}</div>}
    </div>
  );
};
