import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

// Mock para el tracking
jest.mock("@/lib/tracking", () => ({
  trackEvent: jest.fn(),
}));

import { trackEvent } from "@/lib/tracking";

test("renders button", () => {
  render(<Button>Test</Button>);
  expect(screen.getByText("Test")).toBeInTheDocument();
});

test("triggers click", () => {
  const fn = jest.fn();
  render(<Button onClick={fn}>Click Me</Button>);

  fireEvent.click(screen.getByText("Click Me"));
  expect(fn).toHaveBeenCalled();
});

test("does not trigger click when disabled", () => {
  const fn = jest.fn();
  render(
    <Button state="disabled" onClick={fn}>
      Disabled
    </Button>
  );

  fireEvent.click(screen.getByText("Disabled"));
  expect(fn).not.toHaveBeenCalled();
});

test("calls trackEvent when clicked", () => {
  render(<Button variant="primary">Click Me</Button>);

  fireEvent.click(screen.getByText("Click Me"));

  expect(trackEvent).toHaveBeenCalled();
  expect(trackEvent).toHaveBeenCalledWith(
    expect.objectContaining({
      component: "button",
      action: "click",
      variant: "primary",
    })
  );
});
