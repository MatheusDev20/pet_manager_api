export type JwtData = {
  access_token: string;
  expiration: string;
};

export interface CreateJwtData {
  username: string;
  sub: string;
}

export interface JwtPayload {
  id: string;
}

export type CookieData = {
  accessToken: string;
};
