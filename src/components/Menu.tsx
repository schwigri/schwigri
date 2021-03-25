import { PageType, PrismicContext } from "../types/prismic.types";
import { StaticQuery, graphql } from "gatsby";
import { StoreActions, StoreState } from "../types/store.types";
import { getLanguageCode, getSlug } from "../utils/localization.util";
import { Button } from "./Button";
import { SiteContext } from "../context/site.context";
import { LangSwitcher } from "./LangSwitcher";
import { Link } from "./Link";
import { MenuIcon } from "./Icon";
import React from "react";
import { Translation } from "../constants/translation.constants";
import { connect } from "react-redux";
import { getTranslation } from "../utils/translation.util";
import styled from "styled-components";

const MenuLink = styled(Link)`
	border-bottom: 0;
	color: inherit;
	font-size: 1.6em;
	font-weight: 600;
	margin-bottom: 1em;
	position: relative;
	text-decoration: none;
	transition: transform 0.3s;

	@media (min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
		margin-bottom: 0;
		margin-left: 3em;

		&:first-child {
			margin-left: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		transition: 0s;
	}

	&:last-child {
		margin-bottom: 0;
	}

	&::after {
		align-items: center;
		display: none;
		content: "←";
		height: 100%;
		opacity: 0;
		position: absolute;
		transform: translate3d(0.75em, 0, 0);
		transition: opacity 0.3s, transform 0.3s;
		right: 0;
		top: 0;

		@media (min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
			display: flex;
		}

		@media (prefers-reduced-motion: reduce) {
			transition: 0s;
		}
	}

	&[aria-current="page"],
	&:focus,
	&:hover {
		background-color: inherit;
		text-decoration: underline;
		@media (min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
			transform: translate3d(-1em, 0, 0);
			text-decoration: none;
		}

		&::after {
			@media (min-width: ${({ theme }): string =>
					`${theme.breakpoints.md}px`}) {
				opacity: 1;
				transform: translate3d(1.25em, 0, 0);
			}
		}
	}
`;

interface WrapperProps {
	$open?: boolean;
}

const Wrapper = styled("nav")<WrapperProps>`
	background-color: ${({ theme }): string => theme.colors.background};
	box-shadow: 0 0 1px
		${({ $open, theme }): string =>
			$open ? theme.colors.separatorShadow : "rgba(0, 0, 0, 0)"};
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	left: 0;
	opacity: 1;
	padding: 1em;
	position: absolute;
	top: 100%;
	transform: ${({ $open }): string =>
		$open ? "translate3d(0, 0, 0)" : "translate3d(0, calc(-100% - 72px), 0)"};
	transition: opacity 0s, transform 0.3s, visibility 0.3s;
	visibility: ${({ $open }): string => ($open ? "visible" : "hidden")};
	width: 100%;
	z-index: 1;

	@media (prefers-reduced-motion: reduce) {
		opacity: ${({ $open }): number => ($open ? 1 : 0)};
		transform: translate3d(0, 0, 0);
		transition: opacity 0.3s, transform 0s, visibility 0.3s;
	}

	@media (min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
		align-items: center;
		box-shadow: none;
		flex-direction: row;
		justify-content: flex-end;
		opacity: 1;
		padding: 0;
		position: relative;
		transform: translate3d(0, 0, 0);
		transition: 0s;
		visibility: visible;
	}

	&::before {
		background-color: ${({ theme }): string => theme.colors.background};
		content: "";
		height: 2px;
		left: 0;
		position: absolute;
		top: -1px;
		width: 100%;
		z-index: 1;

		@media (min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
			display: none;
		}
	}
`;

interface ButtonProps {
	$open?: boolean;
}

const ToggleButton = styled(Button)<ButtonProps>`
	overflow: visible;
	position: relative;
	z-index: 2;

	svg {
		transform: ${({ $open }): string =>
			$open ? "rotate(-90deg)" : "rotate(0deg)"};
		transition: transform 0.3s;
	}
`;

interface Props {
	data: {
		pages: {
			edges: {
				node: {
					data: {
						menuText?: string;
					};
					id: string;
					lang: string;
					uid: string;
				};
			}[];
		};
	};
	open?: boolean;
	toggleMenu?: () => void;
}

class Menu extends React.Component<Props> {
	render(): React.ReactNode {
		const { data, open, toggleMenu } = this.props;

		return (
			<SiteContext.Consumer>
				{(context): React.ReactElement => (
					<>
						<ToggleButton
							aria-label={getTranslation(
								!open ? Translation.OpenMenu : Translation.CloseMenu,
								context.locale
							)}
							className={"until-md"}
							icon={<MenuIcon />}
							onClick={toggleMenu}
							$open={!!open}
							variant={"no-label"}
						/>

						<Wrapper $open={!!open}>
							{data.pages.edges
								.filter(x => x.node.lang.substr(0, 2) === context.lang)
								.map(({ node }): React.ReactElement | null => {
									if (!node.data.menuText) return null;

									const langCode = getLanguageCode(node.lang);
									const pageContext: PrismicContext = {
										id: node.id,
										locale: node.lang,
										translations: {
											[langCode]: {
												uid: node.uid,
											},
										},
										type: PageType.Page,
									};

									return (
										<MenuLink key={node.id} to={getSlug(pageContext)}>
											{node.data.menuText}
										</MenuLink>
									);
								})}

							<MenuLink
								to={getSlug(
									{ id: "", locale: "", type: PageType.Works },
									context.locale
								)}
							>
								{getTranslation(Translation.Works, context.locale)}
							</MenuLink>

							<MenuLink
								to={getSlug(
									{ id: "", locale: "", type: PageType.Blog },
									context.locale
								)}
							>
								{getTranslation(Translation.Blog, context.locale)}
							</MenuLink>

							<div className={"until-md"}>
								<LangSwitcher />
							</div>
						</Wrapper>
					</>
				)}
			</SiteContext.Consumer>
		);
	}
}

interface GetterProps {
	open?: boolean;
	toggleMenu?: () => void;
}

function getMenu(props: GetterProps): React.ReactElement {
	const query = graphql`
		query MenuQuery {
			pages: allPrismicPage {
				edges {
					node {
						data {
							menuText: menu_text
						}
						id
						lang
						uid
					}
				}
			}
		}
	`;

	return (
		<StaticQuery
			query={query}
			render={(data): React.ReactElement => <Menu data={data} {...props} />}
		/>
	);
}

const mapStateToProps = ({ menuOpen }: StoreState): GetterProps => {
	return { open: menuOpen };
};

const mapDispatchToProps = (
	dispatch: ({ type }: { type: StoreActions }) => void
): GetterProps => {
	return {
		toggleMenu: (): void => dispatch({ type: StoreActions.ToggleMenu }),
	};
};

const ConnectedMenu = connect(mapStateToProps, mapDispatchToProps)(getMenu);

export { ConnectedMenu as Menu };
