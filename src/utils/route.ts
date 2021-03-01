import routes from "@config/routes";

/**
 * Interfaces
 */
interface LinkProps {
    to: any;
    isCurrentPage: boolean;
}

/**
 *
 * @param routePath The current route key we need
 */
export const getLinkProps = (routePath: string, location: any): LinkProps => ({
    to: routes[routePath].path,
    isCurrentPage: location.pathname === routes[routePath].path,
});
