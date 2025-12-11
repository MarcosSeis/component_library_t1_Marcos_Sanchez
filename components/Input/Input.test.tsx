import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

// mock tracking
jest.mock("@/lib/tracking", () => ({
  trackEvent: jest.fn(),
}));

import { trackEvent } from "@/lib/tracking";

test("renders input with label", () => {
  render(<Input label="Email" />);
  expect(screen.getByText("Email")).toBeInTheDocument();
});

test("triggers onChange", () => {
  const fn = jest.fn();
  render(<Input onChange={fn} />);

  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "hello" } });

  expect(fn).toHaveBeenCalledWith("hello");
});

test("does not trigger onChange when disabled", () => {
  const fn = jest.fn();
  render(<Input state="disabled" onChange={fn} />);

  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "test" } });

  expect(fn).not.toHaveBeenCalled();
});

test("calls trackEvent on change", () => {
  render(<Input />);

  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "demo" } });

  expect(trackEvent).toHaveBeenCalled();
});
