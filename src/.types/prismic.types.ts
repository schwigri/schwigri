import { FixedObject, FluidObject } from "gatsby-image";
import { LanguageCode } from "../.constants/localization.constants";
import { RichTextBlock } from "prismic-reactjs";

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

export interface PrismicItem {
	firstPublicationDate?: string;
	id?: string;
	lang?: string;
	uid?: string;
}

export interface PrismicText {
	html?: string;
	raw?: RichTextBlock[];
	text?: string;
}

export interface PrismicPostBodyCodeBlock extends PrismicItem {
	primary?: {
		content?: PrismicText;
		language?: string;
	};
}

export interface PrismicPostBodyRichText extends PrismicItem {
	primary?: {
		content?: PrismicText;
	};
}

export interface PrismicPost extends PrismicItem {
	data?: {
		body?: (PrismicPostBodyCodeBlock | PrismicPostBodyRichText)[];
		excerpt?: string;
		featuredImage?: {
			alt?: string;
			copyright?: string;
			localFile?: {
				childImageSharp?: {
					fixed?: FixedObject;
					fluid?: FluidObject;
				};
			};
			thumbnails?: {
				mobileCard?: {
					localFile?: {
						childImageSharp?: {
							fixed?: FixedObject;
							fluid?: FluidObject;
						};
					};
				};
			};
		};
		subtitle?: PrismicText;
		title?: PrismicText;
	};
}

export interface PrismicHomepage extends PrismicItem {
	data?: {
		description?: PrismicText;
		title?: PrismicText;
	};
}
