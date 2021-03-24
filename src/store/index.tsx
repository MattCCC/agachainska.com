import { set, createStore } from "@utils/store";

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

const globalStore = createStore(initialState, actions);
const useStore = globalStore.useStore;
const useStoreProp = globalStore.useStoreProp;

export { globalStore, useStore, useStoreProp };
