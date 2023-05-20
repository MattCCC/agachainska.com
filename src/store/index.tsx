import { createStore } from "simplest-react-store";

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
    isSingleProject: false,
};

export type State = typeof initialState;

const actions = {
    showMotionGrid: (state: State, value: boolean) =>
        (state.showMotionGrid = value),
    showWavePattern: (state: State, value: boolean) =>
        (state.showWavePattern = value),
    showFooter: (state: State, value: boolean) => (state.showFooter = value),
    showLogoOnDesktop: (state: State, value: boolean) =>
        (state.showLogoOnDesktop = value),
    showbackgroundColor: (state: State, value: boolean) =>
        (state.showbackgroundColor = value),
    showInitialOverlayAnimation: (state: State, value: boolean) =>
        (state.initialOverlayAnimation = value),
    setBackgroundColor: (state: State, value: string) =>
        (state.backgroundColor = value),
    setDarkTheme: (state: State, value: boolean) => (state.darkTheme = value),
    setCurrentDelayedRoute: (state: State, value: string) =>
        (state.currentDelayedRoute = value),

    showMotionCursor(
        state: State,
        isMotionCursorVisible: boolean,
        motionCursorData?: Partial<State["motionCursorData"]>
    ) {
        return {
            isMotionCursorVisible,
            motionCursorData: {
                ...initialState.motionCursorData,
                ...(motionCursorData || state.motionCursorData),
            },
        };
    },

    onRouteChange(prevState: State, newState: Partial<State>) {
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
