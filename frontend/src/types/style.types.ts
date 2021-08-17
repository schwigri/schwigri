import { StyleBreakpoint } from "../constants/style.constants";

export type StyleBreakpoints = {
	[key in StyleBreakpoint]: number;
};
