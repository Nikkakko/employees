import styled from 'styled-components';
import { Layout, Space, Typography } from 'antd';
import { TeamOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import { CustomButton } from '.';
import { useNavigate, Link } from 'react-router-dom';
import { Paths } from '../Paths';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { logout } from '../features/auth/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const handleNavigate = () => {
    navigate(Paths.home);
  };

  return (
    <Container>
      <StyledSpace>
        <TeamIcon />
        <CustomButton type='ghost' onClick={handleNavigate}>
          <Typography.Title level={1} style={{ margin: 0 }}>
            Employees
          </Typography.Title>
        </CustomButton>
      </StyledSpace>

      <Space>
        {isAuthenticated ? (
          <>
            <Typography.Text
              style={{ marginRight: 12, textTransform: 'capitalize' }}
              strong
            >
              {user?.user.name}
            </Typography.Text>
            <CustomButton
              type='ghost'
              icon={<LoginOutlined />}
              onClick={() => dispatch(logout())}
            >
              Logout
            </CustomButton>
          </>
        ) : (
          <Space>
            <Link to={Paths.register}>
              <CustomButton type='ghost' icon={<UserOutlined />}>
                Register
              </CustomButton>
            </Link>
            <Link to={Paths.login}>
              <CustomButton type='ghost' icon={<LoginOutlined />}>
                Login
              </CustomButton>
            </Link>
          </Space>
        )}
      </Space>
    </Container>
  );
};

const Container = styled(Layout.Header)`
  padding: 20px 0px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;

  background: none;
`;

const TeamIcon = styled(TeamOutlined)`
  font-size: 26px;
  /* margin-right: 12px; */
`;

const StyledSpace = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export default Header;
