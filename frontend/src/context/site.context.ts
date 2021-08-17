import { ISiteContext } from "../types/site.types";
import React from "react";

export const defaultSiteContext: ISiteContext = {
	locale: "en",
	pageType: "page",
};

export const SiteContext =
	React.createContext<ISiteContext>(defaultSiteContext);
