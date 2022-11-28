export type AuthenticateUserData = {
  email: string;
  password: string;
};

export type AuthenticateUserResponse = {
  user: {
    fullName: string;
    email: string;
  };
  token: string;
  refreshToken: string;
};
