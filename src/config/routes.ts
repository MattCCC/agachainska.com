export interface RoutesList {
    [x: string]: RouteStruct;
}

export interface RouteStruct {
    path: string;
}

const routesList: RoutesList = {
    home: {
        path: "/",
    },
    contact: {
        path: "/contact",
    },
    about: {
        path: "/about",
    },
    work: {
        path: "/work",
    },
    remax: {
        path: "/rem-max",
    },
    danishBakery: {
        path: "danish-bankery",
    },
};

export default routesList;
