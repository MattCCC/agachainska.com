import { NextPage } from "next";

import { ErrorContainer } from "components/404";
import { Meta } from "components/meta";

const ErrorPage: NextPage = () => (
    <>
        <Meta title="404 · Aga Chainska" />
        <ErrorContainer />
    </>
);

export default ErrorPage;
