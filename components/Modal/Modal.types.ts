export type ModalSize = "small" | "medium" | "large";

export interface ModalProps {
  open: boolean;
  size?: ModalSize;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}
