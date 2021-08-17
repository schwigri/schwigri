import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link, StaticQuery, graphql } from "gatsby";
import { IStoreState } from "../types/store.types";
import { IStrapiSite } from "../types/strapi.types";
import React from "react";
import { SiteContext } from "../context/site.context";
import { StyleBreakpoint } from "../constants/style.constants";
import { connect } from "react-redux";
import { getBreakpoint } from "../utils/style.util";
import { getPath } from "../utils/l10n.util";
import styled from "styled-components";

const LogoLink = styled(Link)`
	align-items: center;
	display: inline-flex;
	height: 100%;
`;

interface IWrapperProps {
	$initialLoadComplete: boolean;
	$menuOpen: boolean;
}

const Wrapper = styled("span")<IWrapperProps>`
	height: 4rem;
	left: 4rem;
	opacity: ${({ $initialLoadComplete }) => ($initialLoadComplete ? 1 : 0)};
	position: absolute;
	top: 3rem;
	transform: ${({ $initialLoadComplete }) =>
		$initialLoadComplete ? "translate(0, 0)" : "translate(0, -100%)"};
	transition: opacity var(--transition--standard-duration)
			var(--transition--standard-timingFunction),
		transform var(--transition--standard-duration)
			var(--transition--standard-timingFunction);
	z-index: 6;

	@media ${getBreakpoint(StyleBreakpoint.Medium)} {
		position: fixed;
		top: 0;
		transform: ${({ $initialLoadComplete, $menuOpen }) =>
			!$initialLoadComplete
				? "translate(0, -100%)"
				: $menuOpen
				? "translate(calc(16vw - 4rem), 100%)"
				: "translate(0, 0)"};
		z-index: 8;
	}
`;

interface IBrandingProps extends IBrandingGetterProps {
	data: {
		site?: IStrapiSite;
	};
}

class Branding extends React.Component<IBrandingProps> {
	render(): React.ReactNode {
		const { data, initialLoadComplete, menuOpen } = this.props;
		const logo =
			data.site?.logo?.[0]?.localFile && getImage(data.site.logo[0].localFile);

		return (
			<SiteContext.Consumer>
				{context => (
					<Wrapper
						$initialLoadComplete={!!initialLoadComplete}
						$menuOpen={!!menuOpen}
					>
						{logo && (
							<LogoLink to={getPath(context.locale, "page")}>
								<GatsbyImage
									alt={data.site?.logo?.[0]?.alternativeText || ""}
									image={logo}
								/>
							</LogoLink>
						)}
					</Wrapper>
				)}
			</SiteContext.Consumer>
		);
	}
}

interface IBrandingGetterProps {
	initialLoadComplete?: boolean;
	menuOpen?: boolean;
}

function getBranding(props: IBrandingGetterProps): React.ReactElement | null {
	const query = graphql`
		query BrandingQuery {
			site: strapiSite {
				logo {
					alternativeText
					localFile {
						childImageSharp {
							gatsbyImageData(height: 10, placeholder: BLURRED)
						}
					}
				}
			}
		}
	`;

	return (
		<StaticQuery
			query={query}
			render={data => <Branding {...props} data={data} />}
		/>
	);
}

const mapStateToProps = ({
	initialLoadComplete,
	menuOpen,
}: IStoreState): IBrandingGetterProps => ({
	initialLoadComplete,
	menuOpen,
});

const connectedBranding = connect(mapStateToProps)(getBranding);

export { connectedBranding as Branding };
