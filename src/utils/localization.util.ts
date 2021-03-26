import {
	EnglishMonths,
	GermanMonths,
	JapaneseNumerals,
	LanguageCode,
	Locale,
} from "../constants/localization.constants";
import { PageType, PrismicContext } from "../types/prismic.types";
import { Translation } from "../constants/translation.constants";
import { getTranslation } from "./translation.util";
import slugify from "slugify";

type SlugContext =
	| PrismicContext
	| {
			date?: string;
			locale?: string;
			seo?: {
				title?: string;
			};
			tag?: string;
			translations?: {
				[key in LanguageCode]?: {
					date?: string;
					uid: string;
				};
			};
			type: PageType;
			uid?: string;
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
		case PageType.Blog:
			return `${prefix}${getTranslation(Translation.BlogSlug, locale)}`;

		case PageType.Page:
			if (context?.translations?.[lang]?.uid) {
				return `${prefix}${context.translations[lang]?.uid}`;
			} else if (context?.uid) {
				return `${prefix}${context.uid}`;
			}
			return prefix;

		case PageType.Post:
			if (context?.date && context?.uid) {
				const uid = context.translations?.[lang]?.uid || context.uid;
				const date = new Date(
					context.translations?.[lang]?.date || context.date || ""
				);
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				return `${prefix}blog/${year}/${month}/${uid}`;
			}
			return prefix;

		case PageType.Privacy:
			return `${prefix}${getTranslation(Translation.PrivacySlug, locale)}`;

		case PageType.Tag:
			if (
				!(context?.locale && locale && context.locale !== locale) &&
				context?.uid
			) {
				const tag = slugify(context.uid, { locale: getLanguageCode(locale) });
				const slug = getTranslation(Translation.TaggedSlug, locale);
				return `${prefix}blog/${slug}/${tag}`;
			}
			return prefix;

		case PageType.Works:
			return `${prefix}${getTranslation(Translation.WorksSlug, locale)}`;

		default:
			return prefix;
	}
};

const getJapaneseDate = (number: number): string => {
	if (31 < number) return `${number}`;

	if (11 > number) return JapaneseNumerals[number - 1];

	const firstDigit = Math.floor(number / 10);
	const secondDigit = number % 10;

	let result = 1 < firstDigit ? JapaneseNumerals[firstDigit - 1] : "";
	result += JapaneseNumerals[9];
	if (0 !== secondDigit) {
		result += JapaneseNumerals[secondDigit - 1];
	}

	return result;
};

const getJapaneseYear = (number: number): string => {
	const year = number - 2018;
	const jaYear = 1 === year ? "元" : getJapaneseDate(year);
	return `令和${jaYear}年`;
};

export const formatDate = (date: Date, locale: Locale): string => {
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();

	switch (locale) {
		case "de_CH":
			return `${day}. ${GermanMonths[month]} ${year}`;

		case "ja_JP":
			return `${getJapaneseYear(year)}${getJapaneseDate(
				month + 1
			)}月${getJapaneseDate(day)}日`;

		default:
			return `${EnglishMonths[month]} ${day}, ${year}`;
	}
};
