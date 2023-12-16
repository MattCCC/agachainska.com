import { State } from "store/index";

export interface RoutesList {
    [x: string]: RouteStruct;
}

export interface RouteMeta {
    store: Partial<State>;
}

export interface RouteStruct {
    id: string;
    path: string;
    pattern?: string;
    meta?: RouteMeta;
}

export const defaultRouteMeta = {
    store: {
        showMotionGrid: false,
        showFooter: true,
        showLogoOnDesktop: true,
        showWavePattern: true,
        showPageWhiteGradient: true,
        darkTheme: false,
        isSingleProject: false,
        workPageBackgroundColor: "",
        projectPageBackgroundColor: "",
    } as RouteMeta["store"],
};

const routesList: RoutesList = {
    home: {
        id: "home",
        path: "/",
        meta: {
            store: {
                showMotionGrid: true,
                showLogoOnDesktop: false,
                showFooter: false,
            },
        },
    },
    contact: {
        id: "contact",
        path: "/contact",
        meta: {
            store: {
                isMotionCursorVisible: false,
                showMotionGrid: false,
                showFooter: false,
                showPageWhiteGradient: false,
                darkTheme: true,
            },
        },
    },
    thanks: {
        id: "thanks",
        path: "/thanks",
        meta: {
            store: {
                showMotionGrid: true,
                showFooter: false,
                showPageWhiteGradient: false,
                darkTheme: true,
            },
        },
    },
    about: {
        id: "about",
        path: "/about",
        meta: {
            store: {
                isMotionCursorVisible: false,
                showMotionGrid: false,
                showWavePattern: false,
            },
        },
    },
    work: {
        id: "work",
        path: "/work",
        meta: {
            store: {
                isMotionCursorVisible: false,
                showMotionGrid: false,
                showPageWhiteGradient: false,
                showFooter: false,
            },
        },
    },
    project: {
        id: "project",
        path: "/projects/[name]",
        pattern: "/projects/.*?/?$",
        meta: {
            store: {
                isMotionCursorVisible: false,
                showMotionGrid: false,
                showPageWhiteGradient: false,
                showWavePattern: false,
                isSingleProject: true,
            },
        },
    },
};

export default routesList;
