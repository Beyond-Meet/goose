import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SessionActivityIndicator } from "./SessionActivityIndicator";

describe("SessionActivityIndicator", () => {
  it("renders a strong-info inline spinner for running sessions", () => {
    render(<SessionActivityIndicator isRunning />);

    expect(screen.getByLabelText(/chat active/i)).toHaveClass(
      "text-[var(--color-text-info-strong)]",
    );
  });

  it("renders a strong-info inline dot for unread sessions", () => {
    render(<SessionActivityIndicator hasUnread />);

    expect(screen.getByLabelText(/unread messages/i)).toHaveClass(
      "bg-[var(--color-background-info-strong)]",
    );
  });

  it("renders an overlay spinner variant for running sessions", () => {
    const { container } = render(
      <SessionActivityIndicator isRunning variant="overlay" />,
    );

    expect(screen.getByLabelText(/chat active/i)).toBeInTheDocument();
    expect(
      container.querySelector(".text-\\[var\\(--color-text-info-strong\\)\\]"),
    ).toBeTruthy();
  });

  it("renders nothing when the session is idle and read", () => {
    const { container } = render(<SessionActivityIndicator />);

    expect(container).toBeEmptyDOMElement();
  });
});
