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
    meta?: RouteMeta;
}

export const defaultRouteMeta = {
    store: {
        showMotionGrid: true,
        showFooter: true,
        showLogoOnDesktop: true,
        showWavePattern: true,
        showBackgroundGradient: true,
    } as RouteMeta["store"]
};

const routesList: RoutesList = {
    home: {
        id: "home",
        path: "/",
        meta: {
            store: {
                showLogoOnDesktop: false,
                showFooter: false,
            }
        }
    },
    contact: {
        id: "contact",
        path: "/contact",
    },
    about: {
        id: "about",
        path: "/about",
    },
    work: {
        id: "work",
        path: "/work",
        meta: {
            store: {
                showMotionGrid: false,
                showBackgroundGradient: false,
            }
        }
    },
    project: {
        id: "project",
        path: "/projects/[name]/'",
        meta: {
            store: {
                showMotionGrid: false,
                showWavePattern: false,
            }
        }
    },
};

export default routesList;
