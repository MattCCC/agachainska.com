import { State } from "@store/index";

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
        showMotionGrid: true,
        showFooter: true,
        showLogoOnDesktop: true,
        showWavePattern: true,
        showBackgroundGradient: true,
        darkTheme: false,
    } as RouteMeta["store"],
};

const routesList: RoutesList = {
    home: {
        id: "home",
        path: "/",
        meta: {
            store: {
                showLogoOnDesktop: false,
                showFooter: false,
            },
        },
    },
    contact: {
        id: "contact",
        path: "/contact/",
        meta: {
            store: {
                showMotionGrid: false,
                showFooter: false,
                showBackgroundGradient: false,
                darkTheme: true,
            },
        },
    },
    thanks: {
        id: "thanks",
        path: "/thanks/",
        meta: {
            store: {
                showFooter: false,
                showBackgroundGradient: false,
                darkTheme: true,
            },
        },
    },
    about: {
        id: "about",
        path: "/about/",
        meta: {
            store: {
                showMotionGrid: false,
                showWavePattern: false,
            },
        },
    },
    work: {
        id: "work",
        path: "/work/",
        meta: {
            store: {
                showMotionGrid: false,
                showBackgroundGradient: false,
            },
        },
    },
    project: {
        id: "project",
        path: "/projects/[name]/'",
        pattern: "/projects/.*?/$",
        meta: {
            store: {
                showMotionGrid: false,
                showBackgroundGradient: false,
                showWavePattern: false,
            },
        },
    },
};

export default routesList;
