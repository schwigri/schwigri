import { LinkStyles } from "./";
import React from "react";
import styled from "styled-components";

class ExternalLink extends React.Component<React.ComponentProps<"a">> {
	render(): React.ReactNode {
		const { children, ref, ...rest } = this.props;

		const Wrapper = styled("a")`
			${LinkStyles}
		`;

		return (
			<Wrapper rel={"noopener noreferrer"} target={"_blank"} {...rest}>
				{children}
			</Wrapper>
		);
	}
}

export { ExternalLink };
