import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "./Card";

jest.mock("@/lib/tracking", () => ({
  trackEvent: jest.fn(),
}));

import { trackEvent } from "@/lib/tracking";

test("renders card content", () => {
  render(<Card title="Test Card">Body content</Card>);
  
  expect(screen.getByText("Test Card")).toBeInTheDocument();
  expect(screen.getByText("Body content")).toBeInTheDocument();
});

test("calls onClick when card is clicked", () => {
  const fn = jest.fn();
  render(<Card title="Clickable" onClick={fn} />);

  fireEvent.click(screen.getByTestId("card"));
  expect(fn).toHaveBeenCalled();
});

test("tracks card view on mount", () => {
  render(<Card title="View Test" />);

  expect(trackEvent).toHaveBeenCalledWith(
    expect.objectContaining({ action: "view" })
  );
});
