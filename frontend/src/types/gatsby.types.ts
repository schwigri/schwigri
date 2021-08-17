import { SiteTranslations } from "./site.types";

export interface IGatsbyNodes<T> {
	nodes: Array<T>;
}

export interface IGatsbyLocation {
	hash: string;
	host: string;
	hostname: string;
	href: string;
	key: string;
	origin: string;
	pathname: string;
	port: string;
	protocol: string;
	search: string;
	state: unknown | null;
}

export interface IGatsbyPageContext {
	id?: string;
	locale?: string;
	primaryColor?: string;
	translations?: SiteTranslations;
}

export interface IGatsbyPageResources {
	component: React.ReactNode;
	json: {
		pageContext: unknown;
	};
	page: {
		componentChunkName: string;
		matchPath?: string;
		path: string;
		staticQueryHashes: Array<string>;
		webpackCompilationHash: string;
	};
	staticQueryResults: unknown;
}

export interface IGatsbyPageWrapperProps {
	children?: unknown;
	location: IGatsbyLocation;
	navigate: () => void;
	pageContext: IGatsbyPageContext;
	pageResources: IGatsbyPageResources;
	params: unknown;
	path: string;
	uri: string;
}

export interface IGatsbyPageWrapper {
	element: React.ReactNode;
	props: IGatsbyPageWrapperProps;
}

export interface IGatsbyRootWrapper {
	element: React.ReactNode;
}
