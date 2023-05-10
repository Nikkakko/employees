import { Row, Card, Form, Space, Typography, Layout } from 'antd';
import styled from 'styled-components';
import { CustomButton, CustomInput } from '../components';
import PasswordInput from '../components/CustomInputs/PasswordInput';
import { Link } from 'react-router-dom';
import { Paths } from '../Paths';

const Register = () => {
  return (
    <Container>
      <Row align='middle' justify='center'>
        <Card title='Register' style={{ width: '300px' }}>
          <Form
            onFinish={() => {
              'login';
            }}
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
          </Space>
        </Card>
      </Row>
    </Container>
  );
};

const Container = styled.div``;

export default Register;
