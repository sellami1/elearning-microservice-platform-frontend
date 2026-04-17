import type { User } from "@/src/features/auth/types";

export type MeResponse = {
  status: string;
  data: User;
};

export type UpdateMeRequest = Partial<{
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}>;
