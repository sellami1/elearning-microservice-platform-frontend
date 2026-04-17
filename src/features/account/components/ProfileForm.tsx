"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useMe } from "@/src/features/account/hooks/useMe";
import { useUpdateMe } from "@/src/features/account/hooks/useUpdateMe";
import {
  updateMeSchema,
  type UpdateMeSchemaInput,
} from "@/src/features/account/schemas/updateMe.schema";
import { getErrorMessage } from "@/src/lib/errors/getErrorMessage";
import { Button, Card, FieldError, Input, Label } from "@/src/components/ui";

export function ProfileForm() {
  const { data: me, isLoading } = useMe();
  const updateMeMutation = useUpdateMe();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateMeSchemaInput>({
    resolver: zodResolver(updateMeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      dateOfBirth: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
  });

  useEffect(() => {
    if (!me) {
      return;
    }

    reset({
      firstName: me.profile.firstName,
      lastName: me.profile.lastName,
      phone: me.profile.phone,
      dateOfBirth: me.profile.dateOfBirth?.slice(0, 10) ?? "",
      street: me.address.street,
      city: me.address.city,
      state: me.address.state,
      country: me.address.country,
      zipCode: me.address.zipCode,
    });
  }, [me, reset]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await updateMeMutation.mutateAsync(values);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to update profile"));
    }
  });

  return (
    <Card title="Profile">
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
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} />
          <FieldError message={errors.phone?.message} />
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Date of birth</Label>
          <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
        </div>
        <div>
          <Label htmlFor="street">Street</Label>
          <Input id="street" {...register("street")} />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" {...register("city")} />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input id="state" {...register("state")} />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input id="country" {...register("country")} />
        </div>
        <div>
          <Label htmlFor="zipCode">Zip code</Label>
          <Input id="zipCode" {...register("zipCode")} />
        </div>
        <div className="md:col-span-2">
          <Button type="submit" disabled={isLoading || updateMeMutation.isPending}>
            {updateMeMutation.isPending ? "Saving..." : "Save profile"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
