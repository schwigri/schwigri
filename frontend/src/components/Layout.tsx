import { AnimatePresence, motion } from "framer-motion";
import { IStoreState, StoreAction, StoreActions } from "../types/store.types";
import { connect, useDispatch } from "react-redux";
import { Borders } from "./Borders";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { GlobalStyle } from "../utils/style.util";
import { Header } from "./Header";
import { Helmet } from "react-helmet";
import { LoadingScreen } from "./LoadingScreen";
import { Menu } from "./Menu";
import React from "react";
import { globalHistory } from "@reach/router";
import { useEffect } from "react";

interface ILayoutProps {
	children: React.ReactNode;
	id: string;
	initialLoadComplete?: boolean;
	loading?: boolean;
	markInitialLoadComplete?: () => void;
	menuOpen?: boolean;
	primaryColor?: string;
}

class Layout extends React.Component<ILayoutProps> {
	componentDidMount() {
		const { initialLoadComplete, markInitialLoadComplete } = this.props;

		if (!initialLoadComplete) {
			setTimeout(
				() => markInitialLoadComplete && markInitialLoadComplete(),
				500
			);
		}
	}

	render(): React.ReactNode {
		const { children, id, loading, menuOpen, primaryColor } = this.props;

		const classes = [];
		if (loading) classes.push("loading");
		if (menuOpen) classes.push("menuOpen");

		return (
			<>
				<Helmet
					htmlAttributes={{
						class: classes.join(" "),
						style: primaryColor
							? `--primary-color: ${primaryColor}`
							: undefined,
					}}
				/>

				<GlobalStyle />

				<Header />

				<Menu />

				<AnimatePresence>
					<Content
						content={
							<motion.div
								animate={"visible"}
								exit={"exit"}
								initial={"hidden"}
								key={`content-motion-${id}`}
								variants={{
									exit: {
										opacity: 0,
										transition: {
											ease: "easeOut",
										},
									},
									hidden: {
										opacity: 0,
									},
									visible: {
										opacity: 1,
										transition: {
											delay: 0.5,
											ease: "easeIn",
										},
									},
								}}
							>
								{children}
							</motion.div>
						}
						key={`content-${id}`}
					/>
				</AnimatePresence>

				<Footer />

				<Borders />

				<LoadingScreen />
			</>
		);
	}
}

function getLayout(props: ILayoutProps): React.ReactElement | null {
	const dispatch = useDispatch();

	useEffect(() =>
		globalHistory.listen(() => {
			dispatch({ type: StoreActions.CloseMenu });
			dispatch({ type: StoreActions.StartLoading });
			setTimeout(() => dispatch({ type: StoreActions.EndLoading }), 500);
		})
	);

	return <Layout {...props} />;
}

const mapStateToProps = (
	{ initialLoadComplete, loading, menuOpen }: IStoreState,
	ownProps: ILayoutProps
): ILayoutProps => ({
	...ownProps,
	initialLoadComplete,
	loading,
	menuOpen,
});

const mapDispatchToProps = (
	dispatch: (action: StoreAction) => void,
	ownProps: ILayoutProps
): ILayoutProps => ({
	...ownProps,
	markInitialLoadComplete: () =>
		dispatch({ type: StoreActions.MarkInitialLoadComplete }),
});

const connectedLayout = connect(mapStateToProps, mapDispatchToProps)(getLayout);

export { connectedLayout as Layout };
