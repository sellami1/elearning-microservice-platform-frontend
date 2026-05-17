"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useRegister } from "@/src/features/auth/hooks/useRegister";
import {
  registerSchema,
  type RegisterSchemaInput,
} from "@/src/features/auth/schemas/register.schema";
import { getErrorMessage } from "@/src/lib/errors/getErrorMessage";
import { Button, Card, FieldError, Input, Label } from "@/src/components/ui";

export function RegisterForm() {
  const mutation = useRegister();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "instructor0@learn.test",
      password: "Instructor0*",
      passwordConfirm: "Instructor0*",
      firstName: "Joe",
      lastName: "MAMA",
      phone: "+12345678910",
      role: "instructor",
      dateOfBirth: "1990-01-15",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      country: "US",
      zipCode: "10001",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await mutation.mutateAsync(values);
      toast.success(response.message || "Registration successful");
      router.push("/login");
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to register"));
    }
  });

  return (
    <Card title="Register">
      <form className="grid gap-3 md:grid-cols-2" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" {...register("firstName")} />
          <FieldError message={errors.firstName?.message} />
        </div>
        <div>
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" {...register("lastName")} />
          <FieldError message={errors.lastName?.message} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} />
          <FieldError message={errors.phone?.message} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          <FieldError message={errors.password?.message} />
        </div>
        <div>
          <Label htmlFor="passwordConfirm">Confirm password</Label>
          <Input id="passwordConfirm" type="password" {...register("passwordConfirm")} />
          <FieldError message={errors.passwordConfirm?.message} />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <select id="role" className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm" {...register("role")}>
            <option value="learner">Learner</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Date of birth</Label>
          <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
        </div>
        <div>
          <Label htmlFor="street">Street</Label>
          <Input id="street" {...register("street")} />
          <FieldError message={errors.street?.message} />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" {...register("city")} />
          <FieldError message={errors.city?.message} />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input id="state" {...register("state")} />
          <FieldError message={errors.state?.message} />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input id="country" {...register("country")} />
          <FieldError message={errors.country?.message} />
        </div>
        <div>
          <Label htmlFor="zipCode">Zip code</Label>
          <Input id="zipCode" {...register("zipCode")} />
          <FieldError message={errors.zipCode?.message} />
        </div>
        <div className="md:col-span-2">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Creating account..." : "Create account"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
