import React from "react";
import styled from "styled-components";

const CarouselItem = styled("div")`
	flex-shrink: 0;
	scroll-snap-align: start;
`;

const CarouselTrack = styled("div")`
	display: flex;
	scroll-snap-type: x mandatory;
	overflow-x: scroll;
	overflow-y: hidden;
`;

const Wrapper = styled("div")`
	overflow: hidden;
`;

interface Props {
	children?: React.ReactNode;
	className?: string;
}

class Carousel extends React.Component<Props> {
	render(): React.ReactNode {
		const { children, className } = this.props;

		return (
			<Wrapper className={className}>
				<CarouselTrack>{children}</CarouselTrack>
			</Wrapper>
		);
	}
}

export { Carousel, CarouselItem, CarouselTrack };
