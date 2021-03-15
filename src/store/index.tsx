import { createStore } from "react-lit-store";
import { set } from "@utils/store";

const initialState = {
    isHovered: false,
    isPressedWithDelay: false,
};

type State = Partial<typeof initialState>;

const actions = {
    hoverLink: set<State, boolean>("isHovered"),
    setPressedWithDelay: set<State, boolean>("isPressedWithDelay"),
};

export { useStoreProvider } from "react-lit-store";

const globalStore = createStore(initialState, actions);
const useStore = globalStore.useStore;

export { globalStore, useStore };
