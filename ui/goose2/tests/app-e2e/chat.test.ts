import { describe, it, expect } from "vitest";
import { useTestDriver } from "./lib/setup";

describe("Chat", () => {
  const testDriver = useTestDriver("chat");

  it("returns formatted date when asked", async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await testDriver.fill(
      '[data-testid="chat-input"]',
      'Show me the date of Jan 26 2025 in format of "dd-mm-yyyy"',
    );
    await testDriver.click('[data-testid="chat-send"]');

    const bodyText = await testDriver.waitForText("26-01-2025", {
      timeout: 30000,
    });
    expect(bodyText).toContain("26-01-2025");
  });
});
