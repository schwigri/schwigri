import { IStoreState } from "../types/store.types";
import React from "react";
import { StyleBreakpoint } from "../constants/style.constants";
import { connect } from "react-redux";
import { getBreakpoint } from "../utils/style.util";
import styled from "styled-components";

type BorderPosition = "bottom" | "left" | "right" | "top";

type BorderState = "default" | "menuOpen" | "hidden";

interface IBorderProps {
	$position: BorderPosition;
}

const Border = styled("div")<IBorderProps>`
	background-color: var(--color--background);
	left: 0;
	position: fixed;
	top: 0;
	transform-origin: ${({ $position }) => `${$position} center`};
	transition: transform var(--transition--standard-duration)
		var(--transition--standard-timingFunction);
	z-index: 5;

	&[data-position="bottom"],
	&[data-position="top"] {
		height: var(--global--spacing);
		width: 100%;
	}

	&[data-position="left"],
	&[data-position="right"] {
		height: 100%;
		width: var(--global--spacing);
	}

	&[data-position="bottom"] {
		bottom: 0;
		top: inherit;
		transform: translate(0, 100%);
	}

	&[data-position="left"] {
		transform: translate(-100%, 0);
	}

	&[data-position="right"] {
		left: inherit;
		right: 0;
		transform: translate(100%, 0);
	}

	&[data-position="top"] {
		transform: translate(0, -100%);
	}

	@media ${getBreakpoint(StyleBreakpoint.Medium)} {
		&[data-position="bottom"],
		&[data-position="left"],
		&[data-position="right"],
		&[data-position="top"] {
			transform: translate(0, 0);
		}
	}
`;

const Wrapper = styled("div")`
	&[data-state="menuOpen"] {
		${Border} {
			&[data-position="bottom"],
			&[data-position="left"],
			&[data-position="right"],
			&[data-position="top"] {
				transform: translate(0, 0);

				@media ${getBreakpoint(StyleBreakpoint.Medium)} {
					transform: translate(0, 0) scale(2);
				}
			}
		}
	}

	&[data-state="hidden"] {
		${Border} {
			&[data-position="bottom"] {
				transform: translate(0, 100%) scale(1);
			}

			&[data-position="left"] {
				transform: translate(-100%, 0) scale(1);
			}

			&[data-position="right"] {
				transform: translate(100%, 0) scale(1);
			}

			&[data-position="top"] {
				transform: translate(0, -100%) scale(1);
			}
		}
	}
`;

interface IBordersProps {
	initialLoadComplete?: boolean;
	menuOpen?: boolean;
}

class Borders extends React.Component<IBordersProps> {
	render(): React.ReactNode {
		const { initialLoadComplete, menuOpen } = this.props;
		const positions: Array<BorderPosition> = ["bottom", "left", "right", "top"];

		let state: BorderState = "default";

		if (menuOpen) state = "menuOpen";
		if (!initialLoadComplete) state = "hidden";

		return (
			<Wrapper aria-hidden={"true"} data-state={state}>
				{positions.map(position => (
					<Border
						data-position={position}
						key={position}
						$position={position}
					/>
				))}
			</Wrapper>
		);
	}
}

const mapStateToProps = ({
	initialLoadComplete,
	menuOpen,
}: IStoreState): IBordersProps => ({
	initialLoadComplete,
	menuOpen,
});

const connectedBorders = connect(mapStateToProps)(Borders);

export { connectedBorders as Borders };
