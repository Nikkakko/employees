import { Alert } from 'antd';

type Props = {
  message?: string | null;
};

const ErrorMsg = ({ message }: Props) => {
  if (!message) return null;

  return <Alert message={message} type='error' showIcon closable />;
};

export default ErrorMsg;
