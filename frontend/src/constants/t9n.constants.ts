import { Translations } from "../types/t9n.types";

export enum TranslationString {
	ChangeLanguage,
	CloseMenu,
	Menu,
	Untitled,
}

export const EnglishTranslations: Translations = {
	[TranslationString.ChangeLanguage]: "Change language",
	[TranslationString.CloseMenu]: "Close menu",
	[TranslationString.Menu]: "Menu",
	[TranslationString.Untitled]: "Untitled",
};

export const GermanTranslations: Translations = {
	[TranslationString.ChangeLanguage]: "Sprache wechseln",
	[TranslationString.CloseMenu]: "Menü schliessen",
	[TranslationString.Menu]: "Menü",
};

export const FrenchTranslations: Translations = {
	[TranslationString.ChangeLanguage]: "Changer de langue",
	[TranslationString.Menu]: "Menu",
};

export const ItalianTranslations: Translations = {
	[TranslationString.ChangeLanguage]: "Cambia lingua",
	[TranslationString.Menu]: "Menu",
};

export const RomanshTranslations: Translations = {};

export const JapaneseTranslations: Translations = {
	[TranslationString.ChangeLanguage]: "表示言語を切り替える",
	[TranslationString.Menu]: "メニュー",
};
