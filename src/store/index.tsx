import { ConfigurationPage } from "domain/social-media/fetch-social-media-data";
import { createStore } from "simplest-react-store";

const initialState = {
    showMotionGrid: false,
    isMotionCursorVisible: false,
    showFooter: false,
    showLogoOnDesktop: false,
    showPageWhiteGradient: false,
    projectPageBackgroundColor: "",
    workPageBackgroundColor: "",
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

    socialMediaData: [] as ConfigurationPage["socialMedia"],
};

export type State = typeof initialState;

const actions = {
    showMotionGrid: (state: State, value: boolean) =>
        (state.showMotionGrid = value),
    showWavePattern: (state: State, value: boolean) =>
        (state.showWavePattern = value),

    showPageWhiteGradient: (state: State, value: boolean) =>
        (state.showPageWhiteGradient = value),
    setWorkPageBackgroundColor: (state: State, value: string) =>
        (state.workPageBackgroundColor = value),
    setProjectPageBackgroundColor: (state: State, value: string) =>
        (state.projectPageBackgroundColor = value),
    setDarkTheme: (state: State, value: boolean) => (state.darkTheme = value),

    showFooter: (state: State, value: boolean) => (state.showFooter = value),
    showLogoOnDesktop: (state: State, value: boolean) =>
        (state.showLogoOnDesktop = value),
    showInitialOverlayAnimation: (state: State, value: boolean) =>
        (state.initialOverlayAnimation = value),
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

    setSocialMediaData(state: State, data: ConfigurationPage["socialMedia"]) {
        if (!state.socialMediaData?.length) {
            state.socialMediaData = data;
        }
    },

    onRouteChange(_prevState: State, newState: Partial<State>) {
        return newState;
    },
};

export const { useStore, useStoreProp, Provider } = createStore(
    initialState,
    actions
);
