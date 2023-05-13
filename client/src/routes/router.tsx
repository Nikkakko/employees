import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Paths } from '../Paths';
import { Register, Login, Employees, Status, EmployeeDetails } from '../pages';
import RootLayout from '../layouts/RootLayout';
import { EmployeeEdit } from '../pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Paths.home} element={<RootLayout />}>
      <Route index element={<Employees />} />
      <Route path={Paths.register} element={<Register />} />
      <Route path={Paths.login} element={<Login />} />
      <Route path={`${Paths.status}/:status`} element={<Status />} />
      <Route path={`${Paths.employee}/:id`} element={<EmployeeDetails />} />
      <Route path={`${Paths.employeeEdit}/:id`} element={<EmployeeEdit />} />
    </Route>
  )
);

export default router;
