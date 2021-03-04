import routes from "@config/routes";

/**
 * Interfaces
 */
export interface LinkProps {
    to: any;
    isCurrentPage?: boolean;
}

/**
 * Get props for particular link's styled component
 * @param routePath         Current route name
 */
export const getLinkProps = (routePath: string, location: any): LinkProps => ({
    to: routes[routePath].path,
    isCurrentPage: location.pathname === routes[routePath].path,
});

/**
 * Get route path
 * @param routePath         Current route name
 */
export const getRoutePath = (routePath: string): LinkProps => ({
    to: routes[routePath].path,
});
