import { ExternalLink, Link } from "./Link";
import { Context } from "./Context";
import { PageType } from "../types/prismic.types";
import React from "react";
import { Translation } from "../constants/translations.constants";
import { getTranslation } from "../utils/translation.util";
import styled from "styled-components";
import { getSlug } from "../utils/localization.util";

const RepoText = styled("abbr")`
	&::after {
		@media (min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
			content: "\\A("attr(title) ")" !important;
			white-space: pre;
		}
	}
`;

const Item = styled("span")`
	margin: 0.5em 0;
	text-align: center;

	&:not(:last-child)::after {
		@media (pointer: fine) and (min-width: ${({ theme }): string =>
				`${theme.breakpoints.sm}px`}),
			(min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
			content: "/";
			margin: 0 0.5em;
		}
	}
`;

const Side = styled("div")`
	display: flex;
	flex-direction: column;
	justify-content: center;

	@media (pointer: fine) and (min-width: ${({ theme }): string =>
			`${theme.breakpoints.sm}px`}),
		(min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
		align-items: baseline;
		flex-direction: row;
	}
`;

const Content = styled("div")`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	max-width: ${({ theme }): string => theme.sizes.content};

	@media (pointer: fine) and (min-width: ${({ theme }): string =>
			`${theme.breakpoints.sm}px`}),
		(min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
		flex-direction: row;
		justify-content: center;
	}
`;

const Wrapper = styled("footer")`
	padding: 1em 1em calc(1em + env(safe-area-inset-bottom)) 1em;
	z-index: 1;

	@media (min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
		padding: 2em;
	}
`;

class Footer extends React.Component {
	render(): React.ReactNode {
		return (
			<Context.Consumer>
				{(context): React.ReactElement => (
					<Wrapper>
						<Content>
							<Side>
								<Item>{getTranslation(Translation.Copyright, context.locale)}</Item>

								<Item>
									<Link
										to={getSlug({ type: PageType.Privacy }, context.locale)}
									>
										{getTranslation(Translation.Privacy, context.locale)}
									</Link>
								</Item>

								<Item>
									<ExternalLink href={"https://github.com/schwigri/schwigri"}>
										<RepoText
											title={getTranslation(
												Translation.MadeWithLovePeaceReact,
												context.locale
											)}
										>
											💖✌️⚛️
										</RepoText>
									</ExternalLink>
								</Item>
							</Side>
						</Content>
					</Wrapper>
				)}
			</Context.Consumer>
		);
	}
}

export { Footer };
