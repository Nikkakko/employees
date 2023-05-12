import { api } from './api';

export type UserType = {
  token: string;

  user: {
    id: string;
    email: string;
    password: string;
    name: string;
  };
};

export type loginData = Omit<UserType, 'id'>;

export type ResponseLoginData = UserType & { token: string };

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: loginData => ({
        url: '/user/login',
        method: 'POST',
        body: loginData,
      }),
    }),

    register: builder.mutation({
      query: loginData => ({
        url: '/user/register',
        method: 'POST',
        body: loginData,
      }),
    }),

    current: builder.query<ResponseLoginData, void>({
      query: () => ({
        url: '/user/current',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } =
  authApi;

export const {
  endpoints: { login, register, current },
} = authApi;
