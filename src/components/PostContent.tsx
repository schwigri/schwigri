import { PrismicPostBodyBlock } from "../types/prismic.types";
import React from "react";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";

const Section = styled("section")`
	&:first-child > p:first-child {
		font-size: 1.1em;
	}
`;

const Wrapper = styled("main")`
	margin: 4em auto;
`;

interface Props {
	content?: Array<PrismicPostBodyBlock>;
}

class PostContent extends React.Component<Props> {
	render(): React.ReactNode {
		const { content } = this.props;

		return (
			<Wrapper>
				{content?.map(block => (
					<Section key={block.id}>
						{"PrismicPostBodyRichText" == block.internal.type && (
							<RichText render={block.primary?.content?.raw} />
						)}
					</Section>
				))}
			</Wrapper>
		);
	}
}

export { PostContent };
