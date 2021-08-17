import { StyleBreakpoints } from "../types/style.types";

export enum StyleBreakpoint {
	Medium,
	Small,
}

export const GlobalBreakpoints: StyleBreakpoints = {
	[StyleBreakpoint.Small]: 544,
	[StyleBreakpoint.Medium]: 768,
};
