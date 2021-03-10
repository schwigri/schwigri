import { getLanguageCode, getSlug } from "../utils/localization.util";
import { Context } from "./Context";
import { Link } from "./Link";
import { Locale } from "../constants/localization.constants";
import React from "react";
import styled from "styled-components";
import { getTranslation } from "../utils/translation.util";

interface LangLinkProps {
	$current?: boolean;
}

const LangLink = styled("span")<LangLinkProps>`
	border-bottom: 0;
	color: inherit;
	font-weight: ${({ $current }): number => ($current ? 700 : 400)};
	text-decoration: none;

	&:last-child {
		&::after {
			display: none;
		}
	}

	&:focus,
	&:hover {
		background-color: inherit;
		text-decoration: ${({ $current }): string =>
			$current ? "none" : "underline"};
	}
`;

class LangSwitcher extends React.Component {
	render(): React.ReactNode {
		return (
			<Context.Consumer>
				{context => (
					<>
						{Object.values(Locale).map((locale, i) => {
							const lang = getLanguageCode(locale);
							return (
								<React.Fragment key={locale}>
									<LangLink
										as={context.lang !== lang ? Link : undefined}
										lang={lang}
										to={getSlug(context.pageContext, locale)}
										$current={context.lang === lang}
									>
										{getTranslation(locale, locale)}
									</LangLink>

									{Object.values(Locale).length - 1 !== i && (
										<span aria-hidden={"true"}> / </span>
									)}
								</React.Fragment>
							);
						})}
					</>
				)}
			</Context.Consumer>
		);
	}
}

export { LangSwitcher };
