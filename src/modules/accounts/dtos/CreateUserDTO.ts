export type CreateUserDTO = {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  document: string;
  email: string;
  password: string;
};

export type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  document: string;
  email: string;
  password?: string;
};
