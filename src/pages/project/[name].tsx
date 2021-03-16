import { ErrorContainer } from "@components/404";
import { PageProps } from "gatsby";

interface Props extends PageProps {}

export default function ProjectCatchAll({ params }: Props): JSX.Element {
    return <ErrorContainer params={params} />;
}
