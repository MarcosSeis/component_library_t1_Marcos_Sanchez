export type InputType = "text" | "email" | "password";
export type InputState = "default" | "error" | "success" | "disabled";

export interface InputProps {
  label?: string;
  type?: InputType;
  value?: string;
  placeholder?: string;
  state?: InputState;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  helperText?: string;
  className?: string;
  onChange?: (value: string) => void;
}
