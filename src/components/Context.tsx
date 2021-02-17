import { LanguageCode, Locale } from "../.constants/localization.constants";
import { PrismicContext } from "../.types/prismic.types";
import React from "react";

interface ContextValue {
	lang: LanguageCode;
	locale: Locale;
	pageContext?: PrismicContext;
}

const Context = React.createContext<ContextValue>({
	lang: LanguageCode.en,
	locale: Locale.en_US,
});

export { Context };
