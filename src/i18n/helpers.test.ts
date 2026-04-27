import { describe, expect, it } from "vitest";
import { getStatusTranslationKey, languageToLocale } from "./helpers";

describe("languageToLocale", () => {
  it("returns locale for each supported language", () => {
    expect(languageToLocale("ru")).toBe("ru-RU");
    expect(languageToLocale("uk")).toBe("uk-UA");
    expect(languageToLocale("en")).toBe("en-US");
  });
});

describe("getStatusTranslationKey", () => {
  it("normalizes spaces and case for supported statuses", () => {
    expect(getStatusTranslationKey("  FREE  ")).toBe("receipts.status.free");
    expect(getStatusTranslationKey("У РЕМОНТІ")).toBe(
      "receipts.status.inRepair",
    );
    expect(getStatusTranslationKey("in use")).toBe("receipts.status.inUse");
  });

  it("returns empty string for unknown status", () => {
    expect(getStatusTranslationKey("archived")).toBe("");
  });
});
