export type CardVariant = "default" | "subtle" | "strong";

export interface CardProps {
  image?: string;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: CardVariant;
  onClick?: () => void;
  className?: string;
}
