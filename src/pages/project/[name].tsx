import { Link } from "@components/link";
import { PageProps } from "gatsby";

interface Props extends PageProps { }

export default function ProjectCatchAll({ params }: Props): JSX.Element {
    return (
        <div className="wrapper">
            <header>
                <Link to="/">Go back to "Home"</Link>
            </header>
            <main>
                <p>This page doesn't exist' "{params.name}"</p>
            </main>
        </div>
    );
}
