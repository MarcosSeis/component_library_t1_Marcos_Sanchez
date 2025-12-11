"use client";

import { ModalProps } from "./Modal.types";
import { trackEvent } from "@/lib/tracking";

export const Modal = ({
  open,
  size = "medium",
  title,
  children,
  footer,
  onClose,
  className = "",
}: ModalProps) => {
  if (!open) return null;

  trackEvent({
    component: "modal",
    action: "open",
    timestamp: Date.now(),
  });

  const handleClose = () => {
    trackEvent({
      component: "modal",
      action: "close",
      timestamp: Date.now(),
    });
    onClose?.();
  };

  const sizeClasses = {
    small: "max-w-sm",     
    medium: "max-w-md",    
    large: "max-w-2xl",    
  };

  return (
    <div
      className="
        fixed inset-0 bg-black/50 backdrop-blur-sm
        flex items-center justify-center z-50
      "
      onClick={handleClose}
      data-testid="modal-overlay"
    >
      <div
        className={`
          bg-white rounded-xl shadow-xl
          ${sizeClasses[size]}
          p-6 relative animate-fadeIn
          max-h-[85vh] overflow-y-auto
          min-w-80 min-h-40
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="mb-6">{children}</div>

        {/* Footer */}
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
};
