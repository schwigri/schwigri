import {
	EnglishTranslations,
	FrenchTranslations,
	GermanTranslations,
	ItalianTranslations,
	JapaneseTranslations,
	RomanshTranslations,
	TranslationString,
} from "../constants/t9n.constants";
import { SiteLocale } from "../types/site.types";
import { get } from "lodash";

export const getTranslation = (
	string: TranslationString,
	locale: SiteLocale,
	data?: Record<string, string>
): string => {
	let translations = EnglishTranslations;

	switch (locale) {
		case "de":
			translations = GermanTranslations;
			break;

		case "fr":
			translations = FrenchTranslations;
			break;

		case "it":
			translations = ItalianTranslations;
			break;

		case "rm":
			translations = RomanshTranslations;
			break;

		case "ja":
			translations = JapaneseTranslations;
			break;
	}

	const translatedString = translations[string] || EnglishTranslations[string];

	return insertDynamicValues(translatedString || "", data);
};

export const insertDynamicValues = (
	translatedString: string,
	data?: Record<string, string>
): string => {
	let success = true;

	const finalString = translatedString.replace(/\$?{([^}]+)}/g, (_, match) => {
		const val = get(data, match, null);
		if (null === val) {
			success = false;
			return "";
		}
		return val;
	});

	return success ? finalString : "";
};
