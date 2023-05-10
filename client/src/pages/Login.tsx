import { Row, Card, Form, Space, Typography, Layout } from 'antd';
import styled from 'styled-components';
import { CustomButton, CustomInput } from '../components';
import PasswordInput from '../components/CustomInputs/PasswordInput';
import { Link } from 'react-router-dom';
import { Paths } from '../Paths';

const Login = () => {
  return (
    <Container>
      <Row align='middle' justify='center'>
        <Card title='Login' style={{ width: '300px' }}>
          <Form
            onFinish={() => {
              'login';
            }}
            style={{ marginBottom: '16px' }}
          >
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
          </Space>
        </Card>
      </Row>
    </Container>
  );
};

const Container = styled.div``;

export default Login;
