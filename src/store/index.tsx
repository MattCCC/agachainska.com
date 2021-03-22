import { createStore } from "react-lit-store";
import { set } from "@utils/store";

const initialState = {
    isMotionCursorVisible: false,
    showMotionGrid: true,
    showWavePattern: true,
    currentDelayedRoute: "",
};

type State = Partial<typeof initialState>;

const actions = {
    showMotionCursor: set<State, boolean>("isMotionCursorVisible"),
    showMotionGrid: set<State, boolean>("showMotionGrid"),
    showWavePattern: set<State, boolean>("showWavePattern"),

    setCurrentDelayedRoute: set<State, string>("currentDelayedRoute"),
};

export { useStoreProvider } from "react-lit-store";

const globalStore = createStore(initialState, actions);
const useStore = globalStore.useStore;

export { globalStore, useStore };
