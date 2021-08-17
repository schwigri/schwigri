import { IGatsbyPageWrapper, IGatsbyRootWrapper } from "../types/gatsby.types";
import { ISiteContext } from "../types/site.types";
import { Layout } from "../components/Layout";
import { Provider } from "react-redux";
import React from "react";
import { SiteContext } from "../context/site.context";
import { createStore } from "./store.util";
import { getLocale } from "./l10n.util";
import { uniqueId } from "lodash";

interface IWrapPageElementProps extends IGatsbyPageWrapper {
	endLoading?: () => void;
	loading?: boolean;
	startLoading?: () => void;
}

export const wrapPageElement = ({
	element,
	props: {
		pageContext: { id, locale, primaryColor, translations },
	},
}: IWrapPageElementProps): React.ReactElement | null => {
	const context: ISiteContext = {
		locale: getLocale(locale),
		pageType: "page",
		translations,
	};

	return (
		<SiteContext.Provider value={context}>
			<Layout id={id || uniqueId()} primaryColor={primaryColor}>
				{element}
			</Layout>
		</SiteContext.Provider>
	);
};

export const wrapRootElement = ({
	element,
}: IGatsbyRootWrapper): React.ReactElement | null => {
	const store = createStore();
	return <Provider store={store}>{element}</Provider>;
};
