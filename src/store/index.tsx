import { set, createStore, mergeState } from "@utils/store";

const initialState = {
    showMotionGrid: true,
    isMotionCursorVisible: false,
    showFooter: false,
    showLogoOnDesktop: false,
    showBackgroundGradient: false,
    darkTheme: false,
    motionCursorData: {
        text: "",
        route: "",
        color: "black",
        size: 80,
        overlap: true,
        projectCover: "",
    },
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
    setDarkTheme: set<State, boolean>("darkTheme"),
    setCurrentDelayedRoute: set<State, string>("currentDelayedRoute"),

    showMotionCursor(
        prevState: State,
        isMotionCursorVisible: boolean,
        motionCursorData?: Partial<State["motionCursorData"]>
    ) {
        return {
            ...prevState,
            isMotionCursorVisible,
            ...mergeState(
                initialState,
                prevState,
                motionCursorData,
                "motionCursorData"
            ),
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
