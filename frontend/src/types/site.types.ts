export type SiteLocale = "de" | "en" | "fr" | "it" | "ja" | "rm";

export type SitePageType = "page";

export type SiteTranslations = {
	[key in SiteLocale]?: {
		id: string;
		slug?: string;
	};
};

export interface ISiteContext {
	locale: SiteLocale;
	pageType: SitePageType;
	translations?: SiteTranslations;
}
