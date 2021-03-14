export interface RoutesList {
    [x: string]: RouteStruct;
}

export interface RouteStruct {
    id: string;
    path: string;
}

const routesList: RoutesList = {
    home: {
        id: "home",
        path: "/",
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
    },
    remax: {
        id: "rem-max",
        path: "/rem-max",
    },
    danishBakery: {
        id: "danish-bankery",
        path: "danish-bankery",
    },
};

export default routesList;
