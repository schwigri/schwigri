import { IStrapiHomepage, IStrapiSite } from "../types/strapi.types";
import { Link, StaticQuery, graphql } from "gatsby";
import { getLocale, getPath } from "../utils/l10n.util";
import { IGatsbyNodes } from "../types/gatsby.types";
import React from "react";
import { SiteContext } from "../context/site.context";
import { StyleBreakpoint } from "../constants/style.constants";
import { getBreakpoint } from "../utils/style.util";
import styled from "styled-components";

interface INavListLinkTitleProps {
	$accent?: string;
}

const NavListLinkTitle = styled("span")<INavListLinkTitleProps>`
	padding: 0 1rem;

	&::after {
		content: ".";
	}

	&::before {
		background-color: ${({ $accent }) =>
			$accent || "var(--default-primary-color)"};
		content: "";
		display: block;
		height: 1.5rem;
		left: 0;
		opacity: 0.5;
		position: absolute;
		right: 0;
		top: 50%;
		transform-origin: left center;
		transform: scaleX(0) translateY(-50%);
		transition: transform 400ms var(--transition--large-timingFunction);
		z-index: -1;
	}
`;

const NavListLink = styled(Link)`
	color: inherit;
	display: inline-block;
	font-size: 1.6em;
	font-weight: 800;
	line-height: 1.1;
	position: relative;
	text-decoration: none;

	@media ${getBreakpoint(StyleBreakpoint.Medium)} {
		font-size: 2.4em;
	}

	&:hover,
	&[aria-current="page"] {
		${NavListLinkTitle}::before {
			transform: scaleX(1) translateY(-50%);
		}
	}
`;

const NavListItem = styled("li")`
	& + & {
		margin-top: 0.6rem;
	}
`;

const NavList = styled("ul")`
	list-style: none;
	margin: 0;
	padding: 0;
`;

const Wrapper = styled("nav")`
	margin: 10rem 0 2rem -1rem;

	@media ${getBreakpoint(StyleBreakpoint.Medium)} {
		margin: 0 0 6rem -1rem;
	}
`;

interface INavigationProps {
	data: {
		homepages: IGatsbyNodes<IStrapiHomepage>;
		sites: IGatsbyNodes<IStrapiSite>;
	};
}

class Navigation extends React.Component<INavigationProps> {
	render(): React.ReactNode {
		const { data } = this.props;

		return (
			<SiteContext.Consumer>
				{context => {
					const homepage = data.homepages.nodes.find(
						search => search.locale === context.locale
					);
					const site = data.sites.nodes.find(
						search => search.locale === context.locale
					);

					return (
						<Wrapper>
							{(homepage || site?.navigation?.length) && (
								<NavList role={"list"}>
									{homepage?.title && (
										<NavListItem>
											<NavListLink to={getPath(context.locale)}>
												<NavListLinkTitle $accent={homepage.primaryColor}>
													{homepage.title}
												</NavListLinkTitle>
											</NavListLink>
										</NavListItem>
									)}
									{site?.navigation?.map(navItem => (
										<NavListItem key={navItem.id}>
											<NavListLink
												to={getPath(
													getLocale(navItem.locale || context.locale),
													"page",
													navItem.slug
												)}
											>
												<NavListLinkTitle $accent={navItem.primaryColor}>
													{navItem.title}
												</NavListLinkTitle>
											</NavListLink>
										</NavListItem>
									))}
								</NavList>
							)}
						</Wrapper>
					);
				}}
			</SiteContext.Consumer>
		);
	}
}

function getNavigation(): React.ReactElement | null {
	const query = graphql`
		query MenuQuery {
			homepages: allStrapiHomepage {
				nodes {
					locale
					primaryColor
					title
				}
			}
			sites: allStrapiSite {
				nodes {
					locale
					navigation {
						id
						primaryColor
						slug
						title
					}
					title
				}
			}
		}
	`;

	return (
		<StaticQuery query={query} render={data => <Navigation data={data} />} />
	);
}

export { getNavigation as Navigation };
