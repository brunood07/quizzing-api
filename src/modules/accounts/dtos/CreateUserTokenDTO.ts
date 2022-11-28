export type ICreateUserTokenDTO = {
  expiresDate: Date;
  refreshToken: string;
  userId: string;
};

export type ICreateUserTokenResponse = {
  id: string;
  refreshToken: string;
  userId: string;
  expiresDate: Date;
  createdAt: Date;
};
