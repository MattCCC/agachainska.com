import deepmerge from "deepmerge";

import routes, { defaultRouteMeta } from "config/routes";

export interface LinkProps {
    to: string;
    state?: Record<string, any>;
    isCurrentPage?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

/**
 * Get props for particular link's styled component
 * @param routeName         Current route name
 */
export const getLinkProps = (
    routeName: string,
    location: Location
): LinkProps => ({
    to: routes[routeName].path,
    isCurrentPage: location.pathname === routes[routeName].path,
});

/**
 * Get route path
 * @param routeName         Current route name
 */
export const getRoutePath = (routeName: string): LinkProps => ({
    to: routes[routeName].path,
});

/**
 * Find route name by a dynamic path
 * @param locationPath Current location path
 */
export const matchRoute = (locationPath: string) => {
    let foundRoute = null;

    Object.entries(routes).some(([routeName, routeOptions]) => {
        const path = routeOptions.path;
        const isDynamic = path.indexOf("[") !== -1;
        const regExp =
            routeOptions.pattern || path.replace(/\[[a-z-]+\]/gi, ".*?");
        const isRouteMatching = isDynamic
            ? new RegExp(regExp).exec(locationPath) !== null
            : locationPath === path;

        if (isRouteMatching) {
            foundRoute = routeName;
        }

        return isRouteMatching;
    });

    return foundRoute;
};

/**
 * Find route options by a dynamic path
 * @param locationPath Current location path
 */
export const findRouteMeta = (locationPath: string) => {
    const routeName = matchRoute(locationPath);

    return deepmerge(defaultRouteMeta, routes[routeName || ""]?.meta || {});
};
