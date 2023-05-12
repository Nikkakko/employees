import { useState } from 'react';
import { Row, Card, Form, Space, Typography } from 'antd';
import styled from 'styled-components';
import { CustomButton, CustomInput } from '../components';
import PasswordInput from '../components/CustomInputs/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../Paths';
import { UserType, useLoginMutation } from '../app/services/auth';
import { isErrorWithMessage } from '../utils/errorMessage';
import ErrorMsg from '../components/ErrorMsg';

const Login = () => {
  const [loginUser, loginUserResult] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (data: UserType) => {
    try {
      await loginUser(data).unwrap();
      navigate(Paths.home);
    } catch (error) {
      const maybeError = isErrorWithMessage(error);
      if (maybeError) {
        setError(error.data.message);
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <Container>
      <Row align='middle' justify='center'>
        <Card title='Login' style={{ width: '300px' }}>
          <Form onFinish={handleLogin} style={{ marginBottom: '16px' }}>
            <CustomInput name='email' placeholder='Email' type='email' />
            <PasswordInput name='password' placeholder='Password' />

            <CustomButton
              type='primary'
              htmlType='submit'
              style={{ width: 'fit-content' }}
            >
              Login
            </CustomButton>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography.Text>
              Don't have an account? <Link to={Paths.register}>Register</Link>
            </Typography.Text>
            <ErrorMsg message={error} />
          </Space>
        </Card>
      </Row>
    </Container>
  );
};

const Container = styled.div``;

export default Login;
