import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks";

export interface IStrapiItemInternal {
	content?: unknown | null;
	contentDigest?: string | null;
	description?: unknown | null;
	fieldOwners?: unknown | null;
	ignoreType?: unknown | null;
	mediaType?: unknown | null;
	owner?: string | null;
	type?: string | null;
}

export interface IStrapiItem<T> {
	children?: Array<IStrapiItem<T>>;
	created_at?: string;
	id?: string;
	internal?: IStrapiItemInternal;
	parent?: IStrapiItem<T>;
	strapiId?: number;
	updated_at?: string;
}

export interface IStrapiLocalization {
	id: number;
	locale: string;
	updated_at: string;
}

export interface IStrapiLocalizableItem<T> extends IStrapiItem<T> {
	locale?: string;
	localizations?: Array<IStrapiLocalization>;
}

export interface IStrapiI18NLocale extends IStrapiItem<IStrapiI18NLocale> {
	code?: string;
	isDefault?: boolean;
	name?: string;
}

export interface IStrapiPage extends IStrapiLocalizableItem<IStrapiPage> {
	primaryColor?: string;
	slug?: string;
	title?: string;
}

export interface IStrapiImage {
	alternativeText?: string;
	caption?: string;
	created_at?: string;
	ext?: string;
	formats?: {
		thumbnail?: {
			ext?: string;
			hash?: string;
			height?: number;
			mime?: string;
			name?: string;
			provider_metadata?: {
				public_id?: string;
				resource_type?: string;
			};
			size?: number;
			url?: string;
			width?: number;
		};
	};
	hash?: string;
	height?: number;
	id?: number;
	localFile?: FileNode;
	mime?: string;
	name?: string;
	provider?: string;
	provider_metadata?: {
		public_id?: string;
		resource_type?: string;
	};
	size?: number;
	updated_at?: string;
	url?: string;
	width?: number;
}

export interface IStrapiSite extends IStrapiLocalizableItem<IStrapiSite> {
	contactEmail?: string;
	contactPhone?: string;
	location?: string;
	logo?: Array<IStrapiImage>;
	navigation?: Array<IStrapiPage>;
	seoTitleTemplate?: string;
	title?: string;
}

export interface IStrapiHomepage
	extends IStrapiLocalizableItem<IStrapiHomepage> {
	primaryColor?: string;
	seoTitle?: string;
	title?: string;
}
