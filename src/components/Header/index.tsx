import { StaticQuery, graphql } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { Menu } from "../Menu";
import React from "react";
import { SiteBranding } from "./SiteBranding";
import styled from "styled-components";

const Content = styled("div")`
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin: 0 auto;
	max-width: ${({ theme }): string => theme.sizes.content};
`;

const Wrapper = styled("header")`
	background-color: ${({ theme }): string => theme.colors.background};
	box-shadow: 0 0 1px ${({ theme }): string => theme.colors.separatorShadow};
	padding: 1em max(1em, env(safe-area-inset-right)) 1em
		max(1em, env(safe-area-inset-left));
	position: sticky;
	top: 0;
	z-index: 3;

	@media (min-width: ${({ theme }): string => `${theme.breakpoints.md}px`}) {
		padding: 2em;
	}
`;

interface Props {
	data: {
		file: IGatsbyImageData;
	};
}

class Header extends React.Component<Props> {
	render(): React.ReactNode {
		const logo = this.props.data.file;

		return (
			<Wrapper>
				<Content>
					<SiteBranding logo={logo} />

					<Menu />
				</Content>
			</Wrapper>
		);
	}
}

function getHeader(): React.ReactElement {
	const query = graphql`
		query HeaderQuery {
			file(relativePath: { eq: "icon.png" }) {
				childImageSharp {
					gatsbyImageData(placeholder: BLURRED, layout: FIXED, width: 40)
				}
			}
		}
	`;

	return (
		<StaticQuery
			query={query}
			render={(data): React.ReactElement => <Header data={data} />}
		/>
	);
}

export { getHeader as Header };
