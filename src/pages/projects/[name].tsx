import { PageProps } from "gatsby";

import { ErrorContainer } from "@components/404";

export default function ProjectCatchAll({ params }: PageProps) {
    return <ErrorContainer params={params} />;
}
