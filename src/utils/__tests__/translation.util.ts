import {
	EnglishTranslations,
	GermanTranslations,
	JapaneseTranslations,
	Translation,
} from "../../constants/translation.constants";
import { Locale } from "../../constants/localization.constants";
import { getTranslation } from "../translation.util";

describe("getTranslation", () => {
	it("should get a simple translation", () => {
		expect(getTranslation(Translation.Blog, Locale.de_CH)).toBe(
			GermanTranslations[Translation.Blog]
		);

		expect(getTranslation(Translation.Blog, Locale.en_US)).toBe(
			EnglishTranslations[Translation.Blog]
		);

		expect(getTranslation(Translation.Blog, Locale.ja_JP)).toBe(
			JapaneseTranslations[Translation.Blog]
		);
	});

	it("should default to english", () => {
		expect(getTranslation(Translation.EnglishOnly, Locale.de_CH)).toBe(
			EnglishTranslations[Translation.EnglishOnly]
		);

		expect(getTranslation(Translation.EnglishOnly, Locale.en_US)).toBe(
			EnglishTranslations[Translation.EnglishOnly]
		);

		expect(getTranslation(Translation.EnglishOnly, Locale.ja_JP)).toBe(
			EnglishTranslations[Translation.EnglishOnly]
		);
	});

	it("should get a complex translation", () => {
		const testData = { title: "Test Title" };

		expect(
			getTranslation(Translation.ContinueReadingTitle, Locale.de_CH, testData)
		).toBe("«Test Title» weiterlesen");

		expect(
			getTranslation(Translation.ContinueReadingTitle, Locale.en_US, testData)
		).toBe("Continue reading “Test Title”");

		expect(
			getTranslation(Translation.ContinueReadingTitle, Locale.ja_JP, testData)
		).toBe("「Test Title」の続きを読む");
	});

	it("should return an empty string when improper data is passed", () => {
		expect(getTranslation(Translation.ContinueReadingTitle, Locale.de_CH)).toBe(
			""
		);
	});
});
