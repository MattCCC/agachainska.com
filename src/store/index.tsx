import { createStore } from "react-lit-store";
import { set } from "@utils/store";

const initialState = {
    isHovered: false,
    currentDelayedRoute: "",
};

type State = Partial<typeof initialState>;

const actions = {
    hoverLink: set<State, boolean>("isHovered"),
    setCurrentDelayedRoute: set<State, string>("currentDelayedRoute"),
    setPageOverlayVisible: set<State, boolean>(""),
};

export { useStoreProvider } from "react-lit-store";

const globalStore = createStore(initialState, actions);
const useStore = globalStore.useStore;

export { globalStore, useStore };
