import { NextPage } from 'next';

const MyError: NextPage<{
  statusCode: number;
  hasGetInitialPropsRun?: boolean;
  err?: string;
}> = ({ statusCode }) => {

  return <div>${statusCode} Test</div>;
};

export default MyError;
