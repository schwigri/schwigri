import { getLocale, getPath } from "../l10n.util";

describe("l10n.util:getLocale", () => {
	it("normalizes supported locales", () => {
		expect(getLocale("de")).toBe("de");
		expect(getLocale("en")).toBe("en");
		expect(getLocale("fr")).toBe("fr");
		expect(getLocale("it")).toBe("it");
		expect(getLocale("ja")).toBe("ja");
		expect(getLocale("rm")).toBe("rm");
	});

	it("defaults to english for unsupported locales", () => {
		expect(getLocale("ar")).toBe(getLocale("en"));
		expect(getLocale("asdf")).toBe(getLocale("en"));
	});
});

describe("l10n.util:getPath", () => {
	it("builds paths for pages", () => {
		expect(getPath("de", "page")).toBe("/de/");
		expect(getPath("en", "page")).toBe("/");
		expect(getPath("fr", "page")).toBe("/fr/");
		expect(getPath("it", "page")).toBe("/it/");
		expect(getPath("ja", "page")).toBe("/ja/");
		expect(getPath("rm", "page")).toBe("/rm/");

		expect(getPath("de", "page", "ueber-mich")).toBe("/de/ueber-mich/");
		expect(getPath("en", "page", "about-me")).toBe("/about-me/");
		expect(getPath("fr", "page", "a-propos")).toBe("/fr/a-propos/");
		expect(getPath("it", "page", "chi-sono")).toBe("/it/chi-sono/");
		expect(getPath("ja", "page", "profile")).toBe("/ja/profile/");
		expect(getPath("rm", "page", "davart-mai")).toBe("/rm/davart-mai/");
	});

	it('defaults to "english" and "page"', () => {
		expect(getPath()).toBe("/");
		expect(getPath("de")).toBe("/de/");
		expect(getPath("en")).toBe("/");
	});
});
