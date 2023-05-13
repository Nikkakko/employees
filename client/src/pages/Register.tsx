import { Row, Card, Form, Space, Typography } from 'antd';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CustomButton, CustomInput } from '../components';
import PasswordInput from '../components/CustomInputs/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../Paths';
import { useAppSelector } from '../app/hook';
import { useRegisterMutation } from '../app/services/auth';
import { isErrorWithMessage } from '../utils/errorMessage';
import ErrorMsg from '../components/ErrorMsg';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);
  const [register] = useRegisterMutation();
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (user) {
      navigate(Paths.home);
    }
  }, [user, navigate]);

  const handleRegister = async (data: RegisterData) => {
    try {
      await register(data).unwrap();

      navigate('/');
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <Container>
      <Row align='middle' justify='center'>
        <Card title='Register' style={{ width: '300px' }}>
          <Form
            name='register'
            onFinish={handleRegister}
            style={{ marginBottom: '16px' }}
          >
            <CustomInput type='name' name='name' placeholder='First Name' />

            <CustomInput name='email' placeholder='Email' type='email' />
            <PasswordInput name='password' placeholder='Password' />
            <PasswordInput
              name='confirmPassword'
              placeholder='Confirm Password'
              dependencies={['password']}
            />

            <CustomButton
              type='primary'
              htmlType='submit'
              style={{ width: 'fit-content' }}
            >
              Register
            </CustomButton>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography.Text>
              Already have an account? <Link to={Paths.login}>Login</Link>
            </Typography.Text>
            <ErrorMsg message={error} />
          </Space>
        </Card>
      </Row>
    </Container>
  );
};

const Container = styled.div``;

export default Register;
