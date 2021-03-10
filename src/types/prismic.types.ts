import { IGatsbyImageData } from "gatsby-plugin-image";
import { LanguageCode } from "../constants/localization.constants";
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
		description?: string;
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
	internal?: {
		type?: string;
	};
	lang?: string;
	uid?: string;
}

interface PrismicImageBase {
	alt?: string;
	copyright?: string;
	localFile?: IGatsbyImageData;
}

export interface PrismicImage extends PrismicImageBase {
	thumbnails?: {
		desktopHeader?: PrismicImageBase;
		mobileCard?: PrismicImageBase;
		og?: PrismicImageBase;
	};
}

export interface PrismicText {
	html?: string;
	raw?: RichTextBlock[];
	text?: string;
}

export interface PrismicPostBodyCodeBlock extends PrismicItem {
	internal: {
		type: "PrismicPostBodyCodeBlock";
	};
	primary?: {
		content?: PrismicText;
		language?: string;
	};
}

export interface PrismicPostBodyRichText extends PrismicItem {
	internal: {
		type: "PrismicPostBodyRichText";
	};
	primary?: {
		content?: PrismicText;
	};
}

export interface PrismicPage extends PrismicItem {
	data?: {
		content?: PrismicText;
		menuText?: string;
		seoDescription?: string;
		seoTitle?: string;
		socialCard?: PrismicImage;
		subtitle?: PrismicText;
		title?: PrismicText;
	};
}

export interface PrismicPost extends PrismicItem {
	data?: {
		body?: (PrismicPostBodyCodeBlock | PrismicPostBodyRichText)[];
		excerpt?: string;
		featuredImage?: PrismicImage;
		seoDescription?: string;
		seoTitle?: string;
		socialCard?: PrismicImage;
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
