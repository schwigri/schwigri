import { Contact } from "./Contact";
import { IStoreState } from "../types/store.types";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MenuId } from "../constants/site.constants";
import { Navigation } from "./Navigation";
import React from "react";
import { StyleBreakpoint } from "../constants/style.constants";
import { connect } from "react-redux";
import { getBreakpoint } from "../utils/style.util";
import styled from "styled-components";

const MobileLanguageSwitcher = styled(LanguageSwitcher)`
	margin: 4rem 0;
`;

const Container = styled("div")`
	display: flex;
	flex-direction: column;
	min-height: 100%;
	padding: 0 4rem;

	@media ${getBreakpoint(StyleBreakpoint.Medium)} {
		display: block;
		min-height: inherit;
		padding: 0 0 0 calc(16vw - 4rem);
	}
`;

interface IWrapperProps {
	$hover: boolean;
	$initialLoadComplete: boolean;
	$open: boolean;
}

const Wrapper = styled("aside")<IWrapperProps>`
	background-color: var(--color--background);
	display: flex;
	flex-direction: column;
	height: 100%;
	left: 0;
	overflow: auto;
	position: fixed;
	right: 8rem;
	top: 0;
	transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(-100%)")};
	transition: transform var(--transition--standard-duration)
		var(--transition--standard-timingFunction);
	z-index: 7;

	@media ${getBreakpoint(StyleBreakpoint.Medium)} {
		align-items: center;
		flex-direction: row;
		left: ${({ $initialLoadComplete }) =>
			$initialLoadComplete ? "var(--global--spacing)" : 0};
		overflow: hidden;
		transform: ${({ $hover, $open }) =>
			$open
				? "translateX(0)"
				: $hover
				? "translateX(-95%)"
				: "translateX(-100%)"};
		transition: left var(--transition--standard-duration)
				var(--transition--large-timingFunction),
			transform var(--transition--standard-duration)
				var(--transition--large-timingFunction),
			visibility var(--transition--standard-duration)
				var(--transition--large-timingFunction);
		right: 20%;
	}

	${Container} {
		transition: visibility var(--transition--standard-duration)
			var(--transition--standard-timingFunction);
		visibility: ${({ $open }) => ($open ? "visible" : "hidden")};
	}
`;

interface IMenuProps {
	hoverMenuButton?: boolean;
	initialLoadComplete?: boolean;
	open?: boolean;
}

class Menu extends React.Component<IMenuProps> {
	render(): React.ReactNode {
		const { hoverMenuButton, initialLoadComplete, open } = this.props;

		return (
			<Wrapper
				aria-modal={"true"}
				aria-hidden={!open ? "true" : undefined}
				id={MenuId}
				role={"dialog"}
				tabIndex={open ? 0 : -1}
				$hover={!!hoverMenuButton}
				$initialLoadComplete={!!initialLoadComplete}
				$open={!!open}
			>
				<Container>
					<MobileLanguageSwitcher className={"until-md"} />

					<Navigation />

					<Contact />
				</Container>
			</Wrapper>
		);
	}
}

const mapStateToProps = ({
	hoverMenuButton,
	initialLoadComplete,
	menuOpen,
}: IStoreState): IMenuProps => ({
	hoverMenuButton,
	initialLoadComplete,
	open: menuOpen,
});

const connectedMenu = connect(mapStateToProps)(Menu);

export { connectedMenu as Menu };
