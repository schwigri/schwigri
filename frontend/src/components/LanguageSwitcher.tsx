import { Link, StaticQuery, graphql } from "gatsby";
import { getLocale, getPath } from "../utils/l10n.util";
import { IGatsbyNodes } from "../types/gatsby.types";
import { IStrapiI18NLocale } from "../types/strapi.types";
import React from "react";
import { SiteContext } from "../context/site.context";
import { TranslationString } from "../constants/t9n.constants";
import { getTranslation } from "../utils/t9n.util";
import styled from "styled-components";

const LanguageLink = styled(Link)`
	text-decoration: none;
	text-transform: uppercase;

	&[href] {
		color: gray;
	}
`;

const LanguageItem = styled("li")`
	display: inline-block;
	line-height: 1;
`;

const LanguageList = styled("ul")`
	align-items: center;
	display: flex;
	font-size: 0.75em;
	font-weight: 600;
	gap: 0.5em;
	margin: 0;
	padding: 0;
`;

interface ILanguageSwitcherProps extends ILanguageSwitcherGetterProps {
	data: {
		locales?: IGatsbyNodes<IStrapiI18NLocale>;
	};
}

class LanguageSwitcher extends React.Component<ILanguageSwitcherProps> {
	render(): React.ReactNode {
		const {
			className,
			data: { locales },
		} = this.props;

		return (
			<SiteContext.Consumer>
				{context => (
					<nav
						aria-label={getTranslation(
							TranslationString.ChangeLanguage,
							context.locale
						)}
						className={className}
					>
						<LanguageList>
							{locales?.nodes.map(strapiLocale => {
								const locale = getLocale(strapiLocale.code);
								const type = context.translations?.[locale]?.slug
									? context.pageType
									: undefined;
								const slug = context.translations?.[locale]?.slug || undefined;
								const target = getPath(locale, type, slug);

								const isCurrent = locale === context.locale;

								return (
									<LanguageItem
										key={strapiLocale.id}
										lang={isCurrent ? undefined : locale}
									>
										{isCurrent ? (
											<LanguageLink as={"a"}>{locale}.</LanguageLink>
										) : (
											<LanguageLink to={target}>{locale}.</LanguageLink>
										)}
									</LanguageItem>
								);
							})}
						</LanguageList>
					</nav>
				)}
			</SiteContext.Consumer>
		);
	}
}

interface ILanguageSwitcherGetterProps {
	className?: string;
}

function getLanguageSwitcher(
	props: ILanguageSwitcherGetterProps
): React.ReactElement | null {
	const query = graphql`
		query LanguageSwitcherQuery {
			locales: allStrapiI18NLocales {
				nodes {
					code
					id
					name
				}
			}
		}
	`;

	return (
		<StaticQuery
			query={query}
			render={data => <LanguageSwitcher {...props} data={data} />}
		/>
	);
}

export { getLanguageSwitcher as LanguageSwitcher };
