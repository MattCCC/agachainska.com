import { FunctionComponent } from "react";

interface Props {
    className?: string;
}

export const MainContainer: FunctionComponent<Props> = ({
    className = "",
    children,
}) => <div className={`container mx-auto ${className}`}>{children}</div>;
