import {
	EnglishTranslations,
	GermanTranslations,
	JapaneseTranslations,
	Translation,
} from "../constants/translations.constants";
import { Locale } from "../constants/localization.constants";
import { get } from "lodash";

export const getTranslation = (
	id: Translation,
	locale: Locale = Locale.en_US,
	data?: { [key: string]: string }
): string => {
	let translationSet;
	switch (locale) {
		case "de_CH":
			translationSet = GermanTranslations;
			break;

		case "ja_JP":
			translationSet = JapaneseTranslations;
			break;

		default:
			translationSet = EnglishTranslations;
	}

	const translatedString = translationSet[id] || EnglishTranslations[id];
	if (!translatedString) return "";

	return insertDynamicValues(translatedString, data);
};

const insertDynamicValues = (
	translatedString: string,
	data?: { [key: string]: string }
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
