import { useCurrentQuery } from '../../app/services/auth';
import { Space, Spin } from 'antd';

type AuthProps = {
  children: JSX.Element;
};

const Auth = ({ children }: AuthProps) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return (
      <Space
        direction='vertical'
        style={{
          width: '100%',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin size='large' />
      </Space>
    );
  }

  return children;
};

export default Auth;
