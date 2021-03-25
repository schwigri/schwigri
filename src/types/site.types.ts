import { LanguageCode, Locale } from "../constants/localization.constants";
import { PrismicContext } from "./prismic.types";

export interface ISiteContext {
	lang: LanguageCode;
	locale: Locale;
	pageContext?: PrismicContext;
}
