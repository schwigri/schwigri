import React from "react";
import styled from "styled-components";

const Wrapper = styled("footer")`
	position: fixed;
	display: none;
`;

class Footer extends React.Component {
	render(): React.ReactNode {
		return (
			<Wrapper>
				<span>Footer</span>
			</Wrapper>
		);
	}
}

export { Footer };
