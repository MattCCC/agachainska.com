import { createStore } from "react-lit-store";
import { set } from "@utils/store";

const initialState = {
    isHovered: false,
    showMotionGrid: true,
    currentDelayedRoute: "",
};

type State = Partial<typeof initialState>;

const actions = {
    hoverLink: set<State, boolean>("isHovered"),
    showMotionGrid: set<State, boolean>("showMotionGrid"),

    setCurrentDelayedRoute: set<State, string>("currentDelayedRoute"),
};

export { useStoreProvider } from "react-lit-store";

const globalStore = createStore(initialState, actions);
const useStore = globalStore.useStore;

export { globalStore, useStore };
