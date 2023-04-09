import { useEffect } from "react";

import { useRouter } from "next/router";

import { useStoreProp } from "store/index";
import { findRouteMeta } from "utils/route";

export const useOnRouteChange = () => {
    const location = useRouter();
    const [, dispatch] = useStoreProp("currentDelayedRoute");

    useEffect(() => {
        const newState = findRouteMeta(location.pathname)?.store || {};

        dispatch.replaceInState(newState);
    }, [dispatch, location.pathname]);
};
