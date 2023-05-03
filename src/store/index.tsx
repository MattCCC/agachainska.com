import { set, createStore, mergeState } from "utils/store";

const initialState = {
    showMotionGrid: false,
    isMotionCursorVisible: false,
    showFooter: false,
    showLogoOnDesktop: false,
    showbackgroundColor: false,
    backgroundColor: "",
    darkTheme: false,
    motionCursorData: {
        text: "",
        target: "_self",
        to: "",
        color: "black",
        size: 80,
        overlap: true,
        projectCover: "",
    },
    showWavePattern: false,
    currentDelayedRoute: "",
};

export type State = typeof initialState;

const actions = {
    showMotionGrid: set<State, boolean>("showMotionGrid"),
    showWavePattern: set<State, boolean>("showWavePattern"),
    showFooter: set<State, boolean>("showFooter"),
    showLogoOnDesktop: set<State, boolean>("showLogoOnDesktop"),
    showbackgroundColor: set<State, boolean>("showbackgroundColor"),
    setBackgroundColor: set<State, string>("backgroundColor"),
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

export type Actions = typeof actions;

const globalStore = createStore(initialState, actions);
const useStore = globalStore.useStore;
const useStoreProp = globalStore.useStoreProp;

export { globalStore, useStore, useStoreProp };
