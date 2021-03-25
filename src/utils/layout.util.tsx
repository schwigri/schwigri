import { getLanguageCode, getLocale } from "./localization.util";
import { SiteContext } from "../context/site.context";
import { Layout } from "../components/Layout";
import { Locale } from "../constants/localization.constants";
import { PrismicContext } from "../types/prismic.types";
import { Provider } from "react-redux";
import React from "react";
import { createStore } from "./store.util";

interface PageWrapperProps {
	element: React.ReactNode;
	props: {
		pageContext?: PrismicContext;
	};
}

export const wrapPageElement = ({
	element,
	props,
}: PageWrapperProps): React.ReactElement | null => {
	const { pageContext } = props;
	const localeString = pageContext?.locale || Locale.en_US;
	const locale = getLocale(localeString);
	const lang = getLanguageCode(locale);

	const context = {
		pageContext,
		lang,
		locale,
	};

	return (
		<SiteContext.Provider value={context}>
			<Layout>{element}</Layout>
		</SiteContext.Provider>
	);
};

interface RootWrapperProps {
	element: React.ReactNode;
}

export const wrapRootElement = ({
	element,
}: RootWrapperProps): React.ReactElement => {
	const store = createStore();
	return <Provider store={store}>{element}</Provider>;
};
