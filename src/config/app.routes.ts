const usersRoot = 'users';
const petsRoot = 'pets';
const v1 = '/api/v1';

export const routesV1 = {
  version: v1,
  user: {
    root: usersRoot,
    delete: `/${usersRoot}/:id`,
  },
  pet: {
    root: petsRoot,
  },
  appointments: {
    root: 'appointments',
  },
  auth: {
    login: '/auth/login',
  },
};
