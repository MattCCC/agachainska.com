import { PageProps } from "gatsby";

import { ErrorContainer } from "@components/404";

interface Props extends PageProps {}

export default function ProjectCatchAll({ params }: Props): JSX.Element {
    return <ErrorContainer params={params} />;
}
