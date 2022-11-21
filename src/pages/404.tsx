import { PageProps } from "gatsby";

import { ErrorContainer } from "components/404";
import { Meta } from "components/meta";

export default function ProjectCatchAll({}: PageProps) {
    return <ErrorContainer />;
}

export const Head = () => <Meta title="404 - Aga Chainska" />;
