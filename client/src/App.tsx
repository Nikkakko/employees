import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { ConfigProvider, theme } from 'antd';
import Auth from './features/auth/auth';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Auth>
        <RouterProvider router={router} />
      </Auth>
    </ConfigProvider>
  );
};

export default App;
