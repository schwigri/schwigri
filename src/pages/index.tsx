import { Context } from "../components/Context";
import { Locale } from "../.constants/localization.constants";
import React from "react";
import { getTranslation } from "../utils/translation.util";

class IndexPage extends React.Component {
	render(): React.ReactNode {
		return (
			<Context.Provider value={{ locale: Locale.de_CH }}>
				<Context.Consumer>
					{context => (
						<p>
							{getTranslation("continue-reading-title", context.locale, {
								title: "Index page",
							})}
						</p>
					)}
				</Context.Consumer>
			</Context.Provider>
		);
	}
}

export default IndexPage;
