import { useEffect } from "react";

import { useRouter } from "next/router";

import { useStoreProp } from "store/index";
import { findRouteMeta } from "utils/route";


export const useOnRouteChange = () => {
    const location = useRouter();
    const [, dispatch] = useStoreProp("currentDelayedRoute");

    useEffect(() => {
        setTimeout(() => {
            const newState = findRouteMeta(location.pathname)?.store || {};

            dispatch.replaceInState(newState);
        }, 0);
    }, [dispatch, location.pathname]);
};
