import { FunctionComponent } from "react";

/**
 * Interfaces
 */
interface Props {
    className?: string;
}

/**
 * Component
 * @param props
 */
export const MainContainer: FunctionComponent<Props> = ({
    className = "",
    children,
}) => <div className={`container mx-auto ${className}`}>{children}</div>;
