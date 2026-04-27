import { describe, expect, it } from "vitest";
import { getDayName, getFormattedDate, getFormattedTime } from "./useTime";

describe("time format helpers", () => {
  const date = new Date("2024-01-15T09:05:00.000Z");
  const localTime = getFormattedTime(date, "en-GB");
  const expectedLocalTime = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  it("formats day name for locale", () => {
    expect(getDayName(date, "en-US")).toBe("Monday");
  });

  it("formats date using locale-specific long month", () => {
    expect(getFormattedDate(date, "en-US")).toBe("January 15, 2024");
  });

  it("formats time in 24-hour format", () => {
    expect(localTime).toMatch(/^\d{2}:\d{2}$/);
    expect(localTime).toBe(expectedLocalTime);
  });
});
