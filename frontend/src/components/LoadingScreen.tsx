import { IStoreState, StoreAction, StoreActions } from "../types/store.types";
import React from "react";
import { SiteContext } from "../context/site.context";
import { TranslationString } from "../constants/t9n.constants";
import { connect } from "react-redux";
import { getTranslation } from "../utils/t9n.util";
import styled from "styled-components";

const CloseMenuButton = styled("button")`
	appearance: none;
	background-color: transparent;
	border: 0;
	cursor: pointer;
	height: 100%;
	padding: 0;
	pointer-events: auto;
	width: 100%;
`;

interface IWrapperProps {
	$loading: boolean;
	$menuOpen: boolean;
}

const Wrapper = styled("div")<IWrapperProps>`
	background-color: var(--primary-color);
	height: 100vh;
	left: 0;
	opacity: ${({ $loading, $menuOpen }) => ($menuOpen ? 0.5 : $loading ? 1 : 0)};
	pointer-events: none;
	position: fixed;
	top: 0;
	transition: background-color var(--transition--standard-duration)
			var(--transition--standard-timingFunction),
		opacity var(--transition--standard-duration)
			var(--transition--standard-timingFunction);
	width: 100vw;
	z-index: 4;
`;

interface ILoadingScreenProps {
	closeMenu?: () => void;
	loading?: boolean;
	menuOpen?: boolean;
}

class LoadingScreen extends React.Component<ILoadingScreenProps> {
	render(): React.ReactNode {
		const { closeMenu, loading, menuOpen } = this.props;

		return (
			<SiteContext.Consumer>
				{context => (
					<Wrapper $loading={!!loading} $menuOpen={!!menuOpen}>
						{menuOpen && (
							<CloseMenuButton
								aria-label={getTranslation(
									TranslationString.CloseMenu,
									context.locale
								)}
								onClick={closeMenu}
							/>
						)}
					</Wrapper>
				)}
			</SiteContext.Consumer>
		);
	}
}

const mapStateToProps = (
	{ loading, menuOpen }: IStoreState,
	ownProps: ILoadingScreenProps
): ILoadingScreenProps => ({
	...ownProps,
	loading,
	menuOpen,
});

const mapDispatchToProps = (
	dispatch: (action: StoreAction) => void,
	ownProps: ILoadingScreenProps
): ILoadingScreenProps => ({
	...ownProps,
	closeMenu: () => dispatch({ type: StoreActions.CloseMenu }),
});

const connectedLoadingScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoadingScreen);

export { connectedLoadingScreen as LoadingScreen };
