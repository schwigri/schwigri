import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby";
import { StoreActions, StoreState } from "../types/store.types";
import styled, { css } from "styled-components";
import { ExternalLink } from "./ExternalLink";
import React from "react";
import { connect } from "react-redux";

const LinkStyles = css`
	border-bottom: ${({ theme }): string =>
		`2px solid ${theme.colors.linkBorder}`};
	color: ${({ theme }): string => theme.colors.accent};
	font-weight: 500;
	text-decoration: none;
	transition: background-color 0.3s, border-bottom-color 0.3s, box-shadow 0.3s;
	@media (prefers-reduced-motion: reduce) {
		transition: 0s;
	}

	&:focus,
	&:hover {
		background-color: ${({ theme }): string => theme.colors.linkBorder};
		border-bottom-color: ${({ theme }): string => theme.colors.accent};
	}

	abbr[title]::before {
		border-bottom-width: 2px;
	}
`;

const Wrapper = styled(GatsbyLink)`
	${LinkStyles}
`;

interface Props extends GatsbyLinkProps<unknown> {
	menuOpen?: boolean;
	toggleMenu?: () => void;
}

class Link extends React.Component<Props> {
	render(): React.ReactNode {
		const {
			children,
			menuOpen,
			onClick,
			// We want to remove the ref and use the rest of the props, otherwise
			// it causes errors
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			ref,
			toggleMenu,
			...rest
		} = this.props;

		const closeMenu = (
			e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
		): void => {
			if (menuOpen && toggleMenu) toggleMenu();
			if (onClick) onClick(e);
		};

		return (
			<Wrapper onClick={closeMenu} {...rest}>
				{children}
			</Wrapper>
		);
	}
}

const mapStateToProps = ({ menuOpen }: StoreState): Props => {
	return { menuOpen, to: "" };
};

const mapDispatchToProps = (
	dispatch: ({ type }: { type: StoreActions }) => void
): Props => {
	return {
		to: "",
		toggleMenu: (): void => dispatch({ type: StoreActions.ToggleMenu }),
	};
};

const mergeProps = (
	stateProps: Props,
	dispatchProps: Props,
	ownProps: Props
): Props => {
	return {
		...ownProps,
		menuOpen: stateProps.menuOpen,
		toggleMenu: dispatchProps.toggleMenu,
	};
};

const ConnectedLink = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(Link);

export { ConnectedLink as Link, ExternalLink, LinkStyles };
