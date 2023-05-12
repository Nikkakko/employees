import { createSlice } from '@reduxjs/toolkit';

import { EmployeeType, employeesApi } from '../../app/services/employees';
import { RootState } from '../../app/store';

interface EmployeesState {
  employees: EmployeeType[] | null;
}

const initialState: EmployeesState = {
  employees: null,
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    logout: () => initialState,
  },

  extraReducers: builder => {
    builder.addMatcher(
      employeesApi.endpoints.getAllEmployees.matchFulfilled,
      (state, action) => {
        state.employees = action.payload;
      }
    );
  },
});

export const { logout } = employeesSlice.actions;

export const selectEmployees = (state: RootState) => state.employees;

export const employeesReducer = employeesSlice.reducer;
