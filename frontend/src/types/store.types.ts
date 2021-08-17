export enum StoreActions {
	StartHoverMenuButton,
	EndHoverMenuButton,
	OpenMenu,
	CloseMenu,
	ToggleMenu,
	StartLoading,
	EndLoading,
	MarkInitialLoadComplete,
}

export type StoreAction = {
	type: StoreActions;
};

export interface IStoreState {
	hoverMenuButton: boolean;
	initialLoadComplete: boolean;
	loading: boolean;
	menuOpen: boolean;
}
