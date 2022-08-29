import { PageProps } from "gatsby";

import { ErrorContainer } from "@components/404";
import { Meta } from "@components/meta";

export default function ProjectCatchAll({ params }: PageProps): JSX.Element {
    return <ErrorContainer params={params} />;
}

export const Head = () => <Meta title="404 - Aga Chainska" />;
