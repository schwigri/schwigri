import { Locale } from "../.constants/localization.constants";
import React from "react";

interface ContextValue {
	locale: Locale;
}

const Context = React.createContext<ContextValue>({ locale: Locale.en_US });

export { Context };
