import { LanguageCode, Locale } from "../constants/localization.constants";
import { ISiteContext } from "../types/site.types";
import React from "react";

export const SiteContext = React.createContext<ISiteContext>({
	lang: LanguageCode.en,
	locale: Locale.en_US,
});
