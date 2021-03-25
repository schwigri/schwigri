import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image";
import { SiteContext } from "../context/site.context";
import { Link } from "./Link";
import { Locale } from "../constants/localization.constants";
import { PageType } from "../types/prismic.types";
import React from "react";
import { Translation } from "../constants/translation.constants";
import { getSlug } from "../utils/localization.util";
import { getTranslation } from "../utils/translation.util";
import styled from "styled-components";

const Title = styled("span")`
	font-family: ${({ theme }): string => theme.fonts.heading};
	font-size: 1.2em;
	font-weight: 500;
	line-height: 1;
	margin: 0;
`;

const Logo = styled("div")`
	height: 4rem;
	margin-right: 0.5em;
	width: 4rem;
`;

const Wrapper = styled(Link)`
	align-items: center;
	border-bottom: 0;
	color: inherit;
	display: flex;
	flex-shrink: 0;
	position: relative;
	text-decoration: none;
	z-index: 2;

	&:focus,
	&:hover {
		background-color: inherit;
	}
`;

interface Props {
	logo: IGatsbyImageData;
}

class SiteBranding extends React.Component<Props> {
	render(): React.ReactNode {
		const logo = getImage(this.props.logo);

		return (
			<SiteContext.Consumer>
				{(context): React.ReactElement => (
					<Wrapper
						to={getSlug({ locale: context.locale, type: PageType.Homepage })}
					>
						{logo && (
							<Logo>
								<GatsbyImage
									alt={getTranslation(Translation.LogoAlt, context.locale)}
									image={logo}
									loading={"eager"}
								/>
							</Logo>
						)}

						<Title
							as={"homepage" === context.pageContext?.type ? "h1" : "span"}
						>
							{Locale.ja_JP === context.locale ? (
								<>
									グリフィン<span className={"upon-lg"}>・シュヴィーゾー</span>
								</>
							) : (
								<>
									Griffen<span className={"upon-sm"}> Schwiesow</span>
								</>
							)}
						</Title>
					</Wrapper>
				)}
			</SiteContext.Consumer>
		);
	}
}

export { SiteBranding };
