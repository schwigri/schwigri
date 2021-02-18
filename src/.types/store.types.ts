export enum StoreActions {
	ToggleMenu,
}

export interface ToggleMenuAction {
	type?: typeof StoreActions.ToggleMenu;
}

export type StoreAction = ToggleMenuAction;

export interface StoreState {
	menuOpen: boolean;
}
