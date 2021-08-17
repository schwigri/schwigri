import { TranslationString } from "../constants/t9n.constants";

export type Translations = {
	[key in TranslationString]?: string;
};
