import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Paths } from '../Paths';
import { Register, Login, Home } from '../pages';
import RootLayout from '../layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Paths.home} element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path={Paths.register} element={<Register />} />
      <Route path={Paths.login} element={<Login />} />
    </Route>
  )
);

export default router;
