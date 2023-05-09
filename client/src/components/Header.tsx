import styled from 'styled-components';
import { Layout, Space, Typography } from 'antd';
import { TeamOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import { CustomButton } from '.';
import { useNavigate, Link } from 'react-router-dom';
import { Paths } from '../Paths';

const Header = () => {
  const navigate = useNavigate();

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
