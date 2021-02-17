import { LanguageCode, Locale } from "../.constants/localization.constants";
import { PageType, PrismicContext } from "../.types/prismic.types";
import { getTranslation } from "./translation.util";

type SlugContext =
	| PrismicContext
	| {
			date?: string;
			locale?: string;
			seo?: {
				title?: string;
			};
			type: PageType;
	  };

export const getHtmlTitle = (
	context?: SlugContext,
	locale = Locale.en_US
): string => {
	const title = context?.seo?.title || getTranslation("home-title", locale);

	switch (context?.type) {
		default:
			return getTranslation("title", locale, { title });
	}
};

export const getLanguageCode = (lang?: string): LanguageCode => {
	const code = (lang || "").substr(0, 2);

	switch (code) {
		case "de":
			return LanguageCode.de;

		case "ja":
			return LanguageCode.ja;

		default:
			return LanguageCode.en;
	}
};

export const getLocale = (localeCode = ""): Locale => {
	switch (localeCode) {
		case "de":
		case "de_CH":
		case "de-ch":
			return Locale.de_CH;

		case "ja":
		case "ja_JP":
		case "ja-jp":
			return Locale.ja_JP;

		default:
			return Locale.en_US;
	}
};

export const getSlug = (context?: SlugContext, locale?: Locale): string => {
	const lang = getLanguageCode(locale || context?.locale);
	const prefix = LanguageCode.en === lang ? "/" : `/${lang}/`;

	switch (context?.type) {
		default:
			return prefix;
	}
};
