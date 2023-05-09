import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const RootLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100%;
  max-height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
  color: white;

  border: 1px solid red;
`;

export default RootLayout;
