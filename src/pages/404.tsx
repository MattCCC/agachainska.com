import { PageProps } from "gatsby";

import { ErrorContainer } from "@components/404";

export default function ProjectCatchAll({ params }: PageProps): JSX.Element {
    return <ErrorContainer params={params} />;
}
