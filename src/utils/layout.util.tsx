import {
	getHtmlTitle,
	getLanguageCode,
	getLocale,
	getSlug,
} from "./localization.util";
import { Context } from "../components/Context";
import { Helmet } from "react-helmet";
import { Layout } from "../components/Layout";
import { Locale } from "../.constants/localization.constants";
import { PrismicContext } from "../.types/prismic.types";
import React from "react";

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
		<Context.Provider value={context}>
			<Helmet>
				<html lang={lang} />
				<title>{getHtmlTitle(pageContext, locale)}</title>

				<link
					href={`https://www.schwigri.com${getSlug(pageContext)}`}
					rel={"canonical"}
				/>

				{Object.values(Locale).map(altLocale => {
					const slug = getSlug(pageContext, altLocale);
					return (
						<link
							href={`https://www.schwigri.com${slug}`}
							hrefLang={getLanguageCode(altLocale)}
							key={altLocale}
							rel={"alternate"}
						/>
					);
				})}
			</Helmet>

			<Layout>{element}</Layout>
		</Context.Provider>
	);
};
