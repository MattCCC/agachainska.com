import { FunctionComponent } from "react";

/**
 * Interfaces
 */
interface Props {
    className?: string;
}

/**
 * Component
 */
export const MainContainer: FunctionComponent<Props> = ({
    className = "",
    children,
}) => <div className={`container mx-auto ${className}`}>{children}</div>;
