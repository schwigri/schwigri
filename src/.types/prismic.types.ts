export type PageType =
	| "blog"
	| "homepage";

export interface PrismicContext {
	date?: string;
	locale: string;
	seo?: {
		title?: string;
	};
	type: PageType;
}
