import { set, createStore } from "simplest-react-store";

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
    initialOverlayAnimation: true,
};

export type State = typeof initialState;

const actions = {
    showMotionGrid: set<State, boolean>("showMotionGrid"),
    showWavePattern: set<State, boolean>("showWavePattern"),
    showFooter: set<State, boolean>("showFooter"),
    showLogoOnDesktop: set<State, boolean>("showLogoOnDesktop"),
    showbackgroundColor: set<State, boolean>("showbackgroundColor"),
    showInitialOverlayAnimation: set<State, boolean>("initialOverlayAnimation"),

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
            ...{
                motionCursorData: {
                    ...prevState.motionCursorData,
                    ...motionCursorData,
                },
                isMotionCursorVisible,
            },
        };
    },

    replaceInState(prevState: State, newState: Partial<State>) {
        return {
            ...prevState,
            ...newState,
        };
    },
};

export const { useStore, useStoreProp, Provider } = createStore(
    initialState,
    actions
);
