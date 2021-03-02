import { Context, ContextValue } from "./Context";
import { Link } from "./Link";
import React from "react";
import { getSlug } from "../utils/localization.util";
import { getTranslation } from "../utils/translation.util";
import styled from "styled-components";

const PageLink = styled(Link)`
	margin: 0 1em;
`;

const Wrapper = styled("div")`
	margin: 4em auto;
	text-align: center;
`;

interface Props {
	currentPage: number;
	numPages: number;
}

class Pagination extends React.Component<Props> {
	render(): React.ReactNode {
		const { currentPage, numPages } = this.props;

		const getLinks = ({
			pageContext,
			locale,
		}: ContextValue): React.ReactNode => {
			const links = [];
			for (let i = 0; i < numPages; i++) {
				const prefix = getSlug(pageContext, locale);
				const target = 0 === i ? prefix : `${prefix}/${i + 1}`;
				const pageNum = `${i + 1}`;
				const label = getTranslation(
					i === currentPage ? "current-page-label" : "page-label",
					locale,
					{ page: pageNum }
				);

				links.push(
					<PageLink aria-label={label} key={i} to={target}>
						{pageNum}
					</PageLink>
				);
			}
			return links;
		};

		const getPreviousLink = ({ pageContext, locale }: ContextValue): string => {
			const prefix = getSlug(pageContext, locale);
			if (currentPage > 1) {
				return `${prefix}/${currentPage - 1}`;
			}

			return prefix;
		};

		const getNextLink = ({ pageContext, locale }: ContextValue): string => {
			const prefix = getSlug(pageContext, locale);
			return `${prefix}/${currentPage + 2}`;
		};

		return (
			<Context.Consumer>
				{(context): React.ReactElement => (
					<Wrapper>
						{currentPage > 0 && (
							<PageLink to={getPreviousLink(context)}>
								{getTranslation("previous", context.locale)}
							</PageLink>
						)}

						{getLinks(context)}

						{currentPage < numPages - 1 && (
							<PageLink to={getNextLink(context)}>
								{getTranslation("next", context.locale)}
							</PageLink>
						)}
					</Wrapper>
				)}
			</Context.Consumer>
		);
	}
}

export { Pagination };
