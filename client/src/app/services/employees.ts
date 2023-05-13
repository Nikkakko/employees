import { api } from './api';

export type EmployeeType = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  age: string;
  userId: string;
};

export const employeesApi = api.injectEndpoints({
  endpoints: builder => ({
    getAllEmployees: builder.query<EmployeeType[], void>({
      query: () => ({
        url: '/employees',
        method: 'GET',
      }),
    }),

    getEmployeeById: builder.query<EmployeeType, string>({
      query: id => ({
        url: `/employees/${id}`,
        method: 'GET',
      }),
    }),

    createEmployee: builder.mutation<EmployeeType, EmployeeType>({
      query: employee => ({
        url: '/employees/add',
        method: 'POST',
        body: employee,
      }),
    }),
    deleteEmployee: builder.mutation<string, string>({
      query: id => ({
        url: `/employees/remove/${id}`,
        method: 'POST',
      }),
    }),

    updateEmployee: builder.mutation<EmployeeType, EmployeeType>({
      query: employee => ({
        url: `/employees/edit/${employee.id}`,
        method: 'PUT',
        body: employee,
      }),
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeesApi; // Export hooks for usage in functional components

export const {
  endpoints: {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  },
} = employeesApi; // Export hooks for usage in class components
