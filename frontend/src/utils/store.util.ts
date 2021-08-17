import { IStoreState, StoreAction, StoreActions } from "../types/store.types";
import { Reducer, Store, createStore as reduxCreateStore } from "redux";

const initialState: IStoreState = {
	hoverMenuButton: false,
	initialLoadComplete: false,
	loading: true,
	menuOpen: false,
};

export const reducer: Reducer<IStoreState, StoreAction> = (
	state = initialState,
	action: StoreAction
) => {
	switch (action.type) {
		case StoreActions.StartHoverMenuButton:
			return { ...state, hoverMenuButton: true };

		case StoreActions.EndHoverMenuButton:
			return { ...state, hoverMenuButton: false };

		case StoreActions.OpenMenu:
			return { ...state, menuOpen: true };

		case StoreActions.CloseMenu:
			return { ...state, menuOpen: false };

		case StoreActions.ToggleMenu:
			return { ...state, menuOpen: !state.menuOpen };

		case StoreActions.MarkInitialLoadComplete:
			return { ...state, initialLoadComplete: true, loading: false };

		case StoreActions.StartLoading:
			return { ...state, loading: true };

		case StoreActions.EndLoading:
			return { ...state, loading: false };

		default:
			return state;
	}
};

export const createStore = (): Store<IStoreState> =>
	reduxCreateStore(reducer, initialState);
