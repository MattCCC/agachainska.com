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
        showbackgroundColor: true,
        darkTheme: false,
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
                backgroundColor: "",
            },
        },
    },
    contact: {
        id: "contact",
        path: "/contact",
        meta: {
            store: {
                showMotionGrid: false,
                showFooter: false,
                showbackgroundColor: false,
                backgroundColor: "",
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
                showbackgroundColor: false,
                backgroundColor: "",
                darkTheme: true,
            },
        },
    },
    about: {
        id: "about",
        path: "/about",
        meta: {
            store: {
                showMotionGrid: false,
                showWavePattern: false,
                backgroundColor: "",
            },
        },
    },
    work: {
        id: "work",
        path: "/work",
        meta: {
            store: {
                showMotionGrid: false,
                showbackgroundColor: false,
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
                showMotionGrid: false,
                showbackgroundColor: false,
                backgroundColor: "",
                showWavePattern: false,
            },
        },
    },
};

export default routesList;
