import 'express';

type AuthenticatedUser = {
  id: string;
};

declare module 'express-serve-static-core' {
  interface Request {
    user: AuthenticatedUser;
  }
}
