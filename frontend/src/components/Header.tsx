import { Branding } from "./Branding";
import { IStoreState } from "../types/store.types";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MenuToggle } from "./MenuToggle";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

interface IDesktopLanguageSwitcherProps {
	$initialLoadComplete: boolean;
	$menuOpen: boolean;
}

const DesktopLanguageSwitcher = styled(
	LanguageSwitcher
)<IDesktopLanguageSwitcherProps>`
	align-items: center;
	display: flex;
	height: var(--global--spacing);
	position: fixed;
	right: var(--global--spacing);
	transform: ${({ $initialLoadComplete, $menuOpen }) =>
		!$initialLoadComplete
			? "translate(0, -60px)"
			: $menuOpen
			? "translate(-40px, 40px)"
			: "translate(0, 0)"};
	transition: transform var(--transition--standard-duration)
		var(--transition--standard-timingFunction);
	z-index: 8;
`;

interface IHeaderProps {
	initialLoadComplete?: boolean;
	menuOpen?: boolean;
}

class Header extends React.Component<IHeaderProps> {
	render(): React.ReactNode {
		const { initialLoadComplete, menuOpen } = this.props;

		return (
			<header>
				<Branding />

				<DesktopLanguageSwitcher
					className={"upon-md"}
					$initialLoadComplete={!!initialLoadComplete}
					$menuOpen={!!menuOpen}
				/>

				<MenuToggle />
			</header>
		);
	}
}

const mapStateToProps = ({
	initialLoadComplete,
	menuOpen,
}: IStoreState): IHeaderProps => ({
	initialLoadComplete,
	menuOpen,
});

const connectedHeader = connect(mapStateToProps)(Header);

export { connectedHeader as Header };
