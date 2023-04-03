import { NextPage } from "next";

const MyError: NextPage<{
    statusCode: number;
    hasGetInitialPropsRun?: boolean;
    err?: string;
}> = ({ statusCode }) => <div>${statusCode} Test</div>;

export default MyError;
