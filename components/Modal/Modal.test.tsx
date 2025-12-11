import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";

jest.mock("@/lib/tracking", () => ({
  trackEvent: jest.fn(),
}));

import { trackEvent } from "@/lib/tracking";

test("renders modal when open", () => {
  render(<Modal open={true} title="Hello" />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});

test("calls onClose when clicking overlay", () => {
  const fn = jest.fn();
  render(<Modal open={true} onClose={fn} />);

  fireEvent.click(screen.getByTestId("modal-overlay"));
  expect(fn).toHaveBeenCalled();
});

test("tracking is called on open", () => {
  render(<Modal open={true} />);
  expect(trackEvent).toHaveBeenCalledWith(
    expect.objectContaining({ action: "open" })
  );
});
