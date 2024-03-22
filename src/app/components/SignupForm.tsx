"use client";

import {
  EnvelopeIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { passwordStrength } from "check-password-strength";
import Link from "next/link";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import PasswordStrength from "./PasswordStrength";
import { registerUser } from "@/lib/actions/authActions";

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "first name must be at least 2 characters" })
      .max(20, { message: "first name must be less than 20 characters" })
      .regex(new RegExp("[a-zA-Z]"), "first name must be only letters"),
    lastName: z
      .string()
      .min(2, { message: "last name must be at least 2 characters" })
      .max(20, { message: "last name must be less than 20 characters" })
      .regex(new RegExp("[a-zA-Z]"), "last name must be only letters"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().regex(new RegExp("[0-9]"), "phone must be only numbers"),
    password: z
      .string()
      .min(6, { message: "password must be at least 6 characters" })
      .max(20, { message: "password must be less than 20 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "password must be at least 6 characters" })
      .max(20, { message: "password must be less than 20 characters" }),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const SignupForm = () => {
  const { register, handleSubmit, reset, control, watch, formState: { errors } } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  const [passStrength, setPassStrength] = React.useState(0);
  const [isvissiblePassword, setIsVisiblePassword] = React.useState(false);

  const saveUser: SubmitHandler<InputType> = async (data) => {
    const { acceptTerms, confirmPassword, ...user } = data;
    try{
      const result = await registerUser(user)
    }
    catch(err){
      console.log(err);
    }
    reset();
  };

  const togglePassword = () => setIsVisiblePassword(!isvissiblePassword);

  useEffect(() => {
    setPassStrength(
      passwordStrength(watch().password).id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch().password]);

  return (
    <form
      onSubmit={handleSubmit(saveUser)}
      className="grid grid-cols-2 border border-gray-900 shadow-md place-self-stretch rounded-md gap-3 p-4"
    >
      <Input
        errorMessage={errors?.firstName?.message}
        isInvalid={!!errors.firstName}
        {...register("firstName")}
        label="first name"
        startContent={<UserIcon className="w-4" />}
        defaultValue=""
      />
      <Input
        errorMessage={errors?.lastName?.message}
        isInvalid={!!errors.lastName}
        {...register("lastName")}
        label="last name"
        startContent={<UserIcon className="w-4" />}
        defaultValue=""
      />
      <Input
        errorMessage={errors?.email?.message}
        isInvalid={!!errors.email}
        {...register("email")}
        className="col-span-2"
        label="email"
        startContent={<EnvelopeIcon className="w-4" />}
        defaultValue=""
      />
      <Input
        errorMessage={errors?.phone?.message}
        isInvalid={!!errors.phone}
        {...register("phone")}
        className="col-span-2"
        label="phone"
        startContent={<PhoneIcon className="w-4" />}
        defaultValue=""
      />
      <Input
        errorMessage={errors?.password?.message}
        isInvalid={!!errors.password}
        {...register("password")}
        className="col-span-2"
        type={isvissiblePassword ? "text" : "password"}
        label="password"
        startContent={<KeyIcon className="w-4" />}
        endContent={
          <button type="button" onClick={togglePassword}>
            {isvissiblePassword ? (
              <EyeSlashIcon className="w-4" />
            ) : (
              <EyeIcon className="w-4" />
            )}
          </button>
        }
        defaultValue=""
      />
      <PasswordStrength passStrength={passStrength} />
      <Input
        errorMessage={errors?.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        {...register("confirmPassword")}
        className="col-span-2"
        type={isvissiblePassword ? "text" : "password"}
        label="confirm password"
        startContent={<KeyIcon className="w-4" />}
        defaultValue=""
      />
      <Controller
        control={control}
        name="acceptTerms"
        render={({ field }) => (
          <Checkbox
            onChange={field.onChange}
            onBlur={field.onBlur}
            className="col-span-2"
          >
            I accept the{" "}
            <Link className="underline" href="#">
              terms and conditions
            </Link>
          </Checkbox>
        )}
      />
      {errors.acceptTerms && (
        <p className="col-span-2 text-red-500">{errors.acceptTerms.message}</p>
      )}
      <div className="col-span-2 flex justify-self-end">
        <Button type="submit" color="primary" className="w-48">
          Sign Up
          <PaperAirplaneIcon className="w-4" />
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
