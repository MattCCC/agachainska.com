import { NextPage } from 'next';
import { ErrorContainer } from 'components/404';
import { Meta } from "components/meta";

const ErrorPage: NextPage = () => {
    return <ErrorContainer />;
};

export default ErrorPage;

export const Head = () => <Meta title="404 - Aga Chainska" />
