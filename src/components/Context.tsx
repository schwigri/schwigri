import { LanguageCode, Locale } from "../constants/localization.constants";
import { PrismicContext } from "../types/prismic.types";
import React from "react";

export interface ContextValue {
	canonical?: string;
	lang: LanguageCode;
	locale: Locale;
	pageContext?: PrismicContext;
}

export const Context = React.createContext<ContextValue>({
	lang: LanguageCode.en,
	locale: Locale.en_US,
});
