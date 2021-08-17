import { IStoreState, StoreAction, StoreActions } from "../types/store.types";
import { MenuId, MenuToggleId } from "../constants/site.constants";
import { Dialog } from "../utils/a11y.util";
import React from "react";
import { SiteContext } from "../context/site.context";
import { StyleBreakpoint } from "../constants/style.constants";
import { TranslationString } from "../constants/t9n.constants";
import { connect } from "react-redux";
import { getBreakpoint } from "../utils/style.util";
import { getTranslation } from "../utils/t9n.util";
import styled from "styled-components";

const Label = styled("span")`
	font-size: 0.7rem;
	font-weight: 800;
	letter-spacing: 0.2em;
	position: absolute;
	right: -2.5rem;
	text-align: center;
	text-transform: uppercase;
	top: 1.6rem;
	transform: rotate(-90deg);
	transition: opacity 150ms linear, color 150ms linear;
	width: 100%;

	&:lang(ja) {
		height: 100%;
		line-height: 3;
		right: -1.5em;
		top: 0.2rem;
		transform: rotate(0);
		writing-mode: vertical-rl;
	}
`;

interface ILineProps {
	$open: boolean;
}

const Line = styled("span")<ILineProps>`
	background-color: #111;
	clear: right;
	float: right;
	height: 0.2rem;
	transition: all 400ms var(--transition--standard-timingFunction);

	&:nth-child(1) {
		transform: ${({ $open }) => ($open ? "rotate(45deg)" : "rotate(0deg)")};
		width: ${({ $open }) => ($open ? "2rem" : "1.6rem")};
	}

	&:nth-child(2) {
		margin-top: ${({ $open }) => ($open ? "-0.2rem" : "0.2rem")};
		transform: ${({ $open }) => ($open ? "rotate(-45deg)" : "rotate(0deg)")};
		width: 2rem;

		@media ${getBreakpoint(StyleBreakpoint.Medium)} {
			margin-top: ${({ $open }) => ($open ? "-0.2rem" : "0.3rem")};
		}
	}

	&:nth-child(3) {
		margin-top: 0.2rem;
		width: ${({ $open }) => ($open ? 0 : "1.2rem")};

		@media ${getBreakpoint(StyleBreakpoint.Medium)} {
			margin-top: 0.3rem;
		}
	}
`;

interface IIconProps {
	$open: boolean;
}

const Icon = styled("span")<IIconProps>`
	position: absolute;
	top: 50%;
	transform: ${({ $open }) =>
		$open ? "translate(0, -1px)" : "translate(0, -50%)"};
	transition: all var(--transition--standard-duration)
		var(--transition--standard-timingFunction);

	@media ${getBreakpoint(StyleBreakpoint.Medium)} {
		right: 0;
		transform: translate(-2rem, -50%);
	}
`;

interface IWrapperProps {
	$initialLoadComplete: boolean;
	$open: boolean;
}

const Wrapper = styled("button")<IWrapperProps>`
	align-items: center;
	appearance: none;
	background-color: var(--color--background);
	border: 0;
	border-radius: 4.5rem;
	cursor: pointer;
	display: flex;
	font-family: inherit;
	height: 4.5rem;
	justify-content: center;
	padding: 0;
	position: fixed;
	right: 2.8rem;
	transition: transform var(--transition--standard-duration)
		var(--transition--standard-timingFunction);
	transform: ${({ $initialLoadComplete }) =>
		$initialLoadComplete ? "translateY(0rem)" : "translateY(-10rem)"};
	top: 2.8rem;
	width: 4.5rem;
	z-index: 8;

	@media ${getBreakpoint(StyleBreakpoint.Medium)} {
		background-color: transparent;
		border-radius: 0;
		height: 4rem;
		left: 4rem;
		margin-left: -1rem;
		margin-top: -2rem;
		right: inherit;
		top: 50%;
		transform: ${({ $initialLoadComplete, $open }) =>
			!$initialLoadComplete
				? "translateX(-10rem)"
				: $open
				? "translateX(2rem)"
				: "translateX(0)"};
		width: 4rem;

		&:hover {
			${Line}:not([data-open="true"]) {
				&:nth-child(1) {
					width: 2rem;
				}

				&:nth-child(2) {
					width: 3.2rem;
				}

				&:nth-child(3) {
					width: 1.8rem;
				}
			}
		}

		&[data-open="true"] {
			${Label} {
				opacity: 0;
			}
		}
	}
`;

interface IMenuToggleProps {
	closeMenu?: () => void;
	endHover?: () => void;
	initialLoadComplete?: boolean;
	menuOpen?: boolean;
	openMenu?: () => void;
	startHover?: () => void;
}

interface IMenuToggleState {
	dialog?: Dialog;
}

class MenuToggle extends React.Component<IMenuToggleProps, IMenuToggleState> {
	constructor(props: IMenuToggleProps) {
		super(props);

		this.state = {};
	}

	componentDidUpdate(prevProps: IMenuToggleProps) {
		if (!this.props.menuOpen && prevProps.menuOpen && this.state.dialog) {
			this.state.dialog.close();
		}
	}

	render(): React.ReactNode {
		const {
			closeMenu,
			endHover,
			initialLoadComplete,
			menuOpen,
			openMenu,
			startHover,
		} = this.props;
		const { dialog } = this.state;

		const dialogOptions = { callback: closeMenu };

		return (
			<SiteContext.Consumer>
				{context => (
					<Wrapper
						aria-label={"Toggle menu"}
						data-open={`${!!menuOpen}`}
						id={MenuToggleId}
						onClick={() => {
							if (menuOpen && dialog) {
								dialog.close();
								this.setState({ dialog: undefined });
							} else {
								if (dialog) dialog.removeListeners();
								const newDialog = new Dialog(
									MenuId,
									MenuToggleId,
									dialogOptions
								);
								this.setState({ dialog: newDialog });
								if (openMenu) openMenu();
							}
						}}
						onMouseEnter={startHover}
						onMouseLeave={endHover}
						$initialLoadComplete={!!initialLoadComplete}
						$open={!!menuOpen}
					>
						<Icon $open={!!menuOpen}>
							<Line data-open={`${!!menuOpen}`} $open={!!menuOpen} />
							<Line data-open={`${!!menuOpen}`} $open={!!menuOpen} />
							<Line data-open={`${!!menuOpen}`} $open={!!menuOpen} />
						</Icon>

						<Label className={"upon-md"}>
							{getTranslation(TranslationString.Menu, context.locale)}
						</Label>
					</Wrapper>
				)}
			</SiteContext.Consumer>
		);
	}
}

const mapStateToProps = ({
	initialLoadComplete,
	menuOpen,
}: IStoreState): IMenuToggleProps => ({
	initialLoadComplete,
	menuOpen,
});

const mapDispatchToProps = (
	dispatch: (action: StoreAction) => void
): IMenuToggleProps => ({
	closeMenu: () => dispatch({ type: StoreActions.CloseMenu }),
	endHover: () => dispatch({ type: StoreActions.EndHoverMenuButton }),
	openMenu: () => dispatch({ type: StoreActions.ToggleMenu }),
	startHover: () => dispatch({ type: StoreActions.StartHoverMenuButton }),
});

const connectedMenuToggle = connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuToggle);

export { connectedMenuToggle as MenuToggle };
