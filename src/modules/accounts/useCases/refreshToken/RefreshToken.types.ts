export interface IPayload {
  sub: string;
  email: string;
}

export interface ITokenResponse {
  token: string;
  refreshToken: string;
}
