import { PrismicText } from "../types/prismic.types";
import React from "react";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";

const Wrapper = styled("div")`
	margin: 4em auto;
	max-width: ${({ theme }): string => theme.sizes.copy};
`;

interface Props {
	content?: PrismicText;
}

class PageContent extends React.Component<Props> {
	render(): React.ReactNode {
		const { content } = this.props;

		return (
			<Wrapper>
				<RichText render={content?.raw} />
			</Wrapper>
		);
	}
}

export { PageContent };
