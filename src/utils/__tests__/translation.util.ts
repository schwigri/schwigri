import {
	TRANSLATIONS_ENGLISH,
	TRANSLATIONS_GERMAN,
	TRANSLATIONS_JAPANESE,
} from "../../constants/translations.constants";
import { Locale } from "../../constants/localization.constants";
import { getTranslation } from "../translation.util";

describe("getTranslation", () => {
	it("should get a simple translation", () => {
		expect(getTranslation("blog", Locale.de_CH)).toBe(
			TRANSLATIONS_GERMAN["blog"]
		);

		expect(getTranslation("blog", Locale.en_US)).toBe(
			TRANSLATIONS_ENGLISH["blog"]
		);

		expect(getTranslation("blog", Locale.ja_JP)).toBe(
			TRANSLATIONS_JAPANESE["blog"]
		);
	});

	it("should default to english", () => {
		expect(getTranslation("english-only", Locale.de_CH)).toBe(
			TRANSLATIONS_ENGLISH["english-only"]
		);

		expect(getTranslation("english-only", Locale.en_US)).toBe(
			TRANSLATIONS_ENGLISH["english-only"]
		);

		expect(getTranslation("english-only", Locale.ja_JP)).toBe(
			TRANSLATIONS_ENGLISH["english-only"]
		);
	});

	it("should get a complex translation", () => {
		const testData = { title: "Test Title" };

		expect(
			getTranslation("continue-reading-title", Locale.de_CH, testData)
		).toBe("«Test Title» weiterlesen");

		expect(
			getTranslation("continue-reading-title", Locale.en_US, testData)
		).toBe("Continue reading “Test Title”");

		expect(
			getTranslation("continue-reading-title", Locale.ja_JP, testData)
		).toBe("「Test Title」の続きを読む");
	});

	it("should return an empty string when improper data is passed", () => {
		expect(getTranslation("continue-reading-title", Locale.de_CH)).toBe("");
	});

	it("should return an empty string when an unused id is passed", () => {
		expect(getTranslation("fake-id", Locale.en_US)).toBe("");
	});
});
