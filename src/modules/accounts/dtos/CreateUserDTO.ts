export type CreateUserDTO = {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  document: string;
  email: string;
  isAdmin: boolean;
  password: string;
  score: number;
};

export type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  document: string;
  email: string;
  isAdmin: boolean;
  password?: string;
  score: number;
};
