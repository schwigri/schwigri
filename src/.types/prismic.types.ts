import { LanguageCode } from "../.constants/localization.constants";

export type PageType =
	| "blog"
	| "homepage"
	| "page"
	| "post"
	| "privacy"
	| "works";

export interface PrismicContext {
	date?: string;
	id: string;
	locale: string;
	seo?: {
		title?: string;
	};
	translations?: {
		[key in LanguageCode]?: string;
	};
	type: PageType;
	uid?: string;
}
