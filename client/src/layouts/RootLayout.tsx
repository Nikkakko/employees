import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';
import { Header } from '../components';

const RootLayout = () => {
  return (
    <Container>
      <Header />
      <AntLayout.Content
        style={{
          height: '100%',
        }}
      >
        <Outlet />
      </AntLayout.Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100%;
  /* max-height: 100vh; */
  max-width: 1440px;
  margin: 0 auto;
  color: white;
`;

export default RootLayout;
