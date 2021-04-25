import { set, createStore } from "@utils/store";

const initialState = {
    showMotionGrid: true,
    isMotionCursorVisible: false,
    showFooter: false,
    showLogoOnDesktop: false,
    showBackgroundGradient: false,
    motionCursorData: { text: "", route: "" },
    showWavePattern: true,
    currentDelayedRoute: "",
};

export type State = typeof initialState;

const actions = {
    showMotionGrid: set<State, boolean>("showMotionGrid"),
    showWavePattern: set<State, boolean>("showWavePattern"),
    showFooter: set<State, boolean>("showFooter"),
    showLogoOnDesktop: set<State, boolean>("showLogoOnDesktop"),
    showBackgroundGradient: set<State, boolean>("showBackgroundGradient"),
    setCurrentDelayedRoute: set<State, string>("currentDelayedRoute"),

    showMotionCursor(
        prevState: State,
        isMotionCursorVisible: boolean,
        motionCursorData?: State["motionCursorData"]
    ) {
        return {
            ...prevState,
            isMotionCursorVisible,
            motionCursorData: motionCursorData
                ? {
                      ...(prevState.motionCursorData || {}),
                      ...(motionCursorData || {}),
                  }
                : prevState.motionCursorData || {},
        };
    },

    replaceInState(prevState: State, newState: Partial<State>) {
        return {
            ...prevState,
            ...newState,
        };
    },
};

const globalStore = createStore(initialState, actions);
const useStore = globalStore.useStore;
const useStoreProp = globalStore.useStoreProp;

export { globalStore, useStore, useStoreProp };
