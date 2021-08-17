import { SiteLocale, SitePageType } from "../types/site.types";

export const getLocale = (locale?: string): SiteLocale => {
	switch (locale) {
		case "de":
			return "de";

		case "fr":
			return "fr";

		case "it":
			return "it";

		case "ja":
			return "ja";

		case "rm":
			return "rm";

		default:
			return "en";
	}
};

export const getPath = (
	locale: SiteLocale = "en",
	type: SitePageType = "page",
	slug?: string
): string => {
	const prefix = "en" === locale ? "/" : `/${locale}/`;

	switch (type) {
		default:
			return `${prefix}${slug ? `${slug}/` : ""}`;
	}
};
