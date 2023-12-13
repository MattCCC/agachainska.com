import { CSSProperties, PropsWithChildren } from "react";

interface Props {
    id?: string;
    className?: string;
    style?: CSSProperties;
}

export const MainSection = ({
    id = "",
    className = "",
    style = {},
    children,
}: PropsWithChildren<Props>) => (
    <section
        id={id}
        className={`relative z-10 h-screen ${className}`}
        style={style}
    >
        {children}
    </section>
);
