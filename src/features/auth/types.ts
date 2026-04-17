export type Role = "learner" | "instructor";

export type UserProfile = {
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
  dateOfBirth?: string;
};

export type UserAddress = {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};

export type User = {
  _id: string;
  email: string;
  role: Role;
  profile: UserProfile;
  address: UserAddress;
  isVerified?: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: string;
  data: User;
  token: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  dateOfBirth?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};
