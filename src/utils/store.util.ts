import { Store, createStore as reduxCreateStore } from "redux";
import { StoreAction, StoreActions, StoreState } from "../types/store.types";

const initialState: StoreState = {
	menuOpen: false,
};

export const createStore = (): Store<StoreState> =>
	reduxCreateStore(reducer, initialState);

export const reducer = (
	state = initialState,
	action: StoreAction
): StoreState => {
	switch (action.type) {
		case StoreActions.ToggleMenu:
			return {
				menuOpen: !state.menuOpen,
			};

		default:
			return state;
	}
};
