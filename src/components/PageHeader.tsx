import { PrismicText } from "../types/prismic.types";
import React from "react";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";

const Subtitle = styled("div")`
	color: ${({ theme }): string => theme.colors.subtitle};
	font-family: ${({ theme }): string => theme.fonts.heading};
	font-size: 1.2em;
`;

const Wrapper = styled("div")`
	margin: 4em auto;
	text-align: center;
`;

interface Props {
	subtitle?: PrismicText;
	title: PrismicText;
}

class PageHeader extends React.Component<Props> {
	render(): React.ReactNode {
		const { subtitle, title } = this.props;

		return (
			<Wrapper>
				<RichText render={title.raw} />

				{subtitle && (
					<Subtitle>
						<RichText render={subtitle.raw} />
					</Subtitle>
				)}
			</Wrapper>
		);
	}
}

export { PageHeader };
