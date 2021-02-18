import {
	TRANSLATIONS_ENGLISH,
	TRANSLATIONS_GERMAN,
	TRANSLATIONS_JAPANESE,
	TRANSLATION_IDS,
} from "../.constants/translations.constants";
import { Locale } from "../.constants/localization.constants";
import { get } from "lodash";

export const getTranslation = (
	id: string,
	locale: Locale = Locale.en_US,
	data?: { [key: string]: string }
): string => {
	const translationId = TRANSLATION_IDS[id] || id;

	let translationSet;
	switch (locale) {
		case "de_CH":
			translationSet = TRANSLATIONS_GERMAN;
			break;

		case "ja_JP":
			translationSet = TRANSLATIONS_JAPANESE;
			break;

		default:
			translationSet = TRANSLATIONS_ENGLISH;
	}

	const translatedString =
		translationSet[translationId] || TRANSLATIONS_ENGLISH[translationId];
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
