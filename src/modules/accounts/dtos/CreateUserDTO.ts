export type CreateUserDTO = {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  document: string;
  email: string;
  phoneNumber: string;
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
  phoneNumber: string;
  password?: string;
  score: number;
};
