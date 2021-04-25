import { set, createStore } from "@utils/store";

const initialState = {
    isMotionCursorVisible: false,
    showBackgroundGradient: false,
    showLogoOnDesktop: false,
    motionCursorData: { text: "", route: "" },
    showMotionGrid: true,
    showWavePattern: true,
    currentDelayedRoute: "",
};

type State = typeof initialState;

const actions = {
    showMotionGrid: set<State, boolean>("showMotionGrid"),
    showWavePattern: set<State, boolean>("showWavePattern"),
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
};

const globalStore = createStore(initialState, actions);
const useStore = globalStore.useStore;
const useStoreProp = globalStore.useStoreProp;

export { globalStore, useStore, useStoreProp };
