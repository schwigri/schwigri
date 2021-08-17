import React from "react";
import styled from "styled-components";

const Wrapper = styled("main")`
	background-color: var(--color--content-background);
	overflow: auto;
`;

interface IContentProps {
	content: React.ReactNode;
}

class Content extends React.Component<IContentProps> {
	render(): React.ReactNode {
		const { content } = this.props;

		return <Wrapper>{content}</Wrapper>;
	}
}

export { Content };
