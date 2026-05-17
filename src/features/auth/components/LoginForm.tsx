"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useLogin } from "@/src/features/auth/hooks/useLogin";
import { loginSchema, type LoginSchemaInput } from "@/src/features/auth/schemas/login.schema";
import { decodeToken, setStoredToken } from "@/src/lib/auth/token";
import { getErrorMessage } from "@/src/lib/errors/getErrorMessage";
import { useAuthStore } from "@/src/store/auth.store";
import { Button, Card, FieldError, Input, Label } from "@/src/components/ui";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useAuthStore((state) => state.setSession);
  const mutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "instructor0@learn.test",
      password: "Instructor0*",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const data = await mutation.mutateAsync(values);
      const claims = decodeToken(data.token);

      if (!claims) {
        throw new Error("Unable to decode token");
      }

      setStoredToken(data.token);
      setSession({ token: data.token, role: claims.role, user: data.data });
      toast.success("Welcome back");

      router.push("/");
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to login"));
    }
  });

  return (
    <Card title="Login">
      <form className="space-y-3" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
          />
          <FieldError message={errors.password?.message} />
        </div>

        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Card>
  );
}
