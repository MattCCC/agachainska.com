import { useMemo } from "react";

import { useLocation } from "@reach/router";

import { useStoreProp } from "store/index";
import { findRouteMeta } from "utils/route";

export const useOnRouteChange = () => {
    const location = useLocation();
    const [, dispatch] = useStoreProp("showFooter");

    useMemo(() => {
        setTimeout(() => {
            const newState = findRouteMeta(location.pathname)?.store || {};

            dispatch.replaceInState(newState);
        }, 0);
    }, [dispatch, location.pathname]);
};
