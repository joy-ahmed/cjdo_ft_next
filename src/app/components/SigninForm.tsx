"use client";
import {
  ArrowRightEndOnRectangleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

type InputType = z.infer<typeof FormSchema>;

const SigninForm = (props: Props) => {
  const router = useRouter();
  const [passVissble, setPassVissble] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    if (!result?.ok){
      toast.error("Incorrect email or password");
      return;
    }
    toast.success("Successfully signed in");
    router.push(props.callbackUrl || "/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Email"
        {...register("email")}
        errorMessage={errors.email?.message}
      />
      <Input
        label="Password"
        type={passVissble ? "text" : "password"}
        {...register("password")}
        errorMessage={errors.password?.message}
        endContent={
          <div
            className="cursor-pointer"
            onClick={() => setPassVissble(!passVissble)}
          >
            {passVissble ? (
              <EyeSlashIcon className="w-4" />
            ) : (
              <EyeIcon className="w-4" />
            )}
          </div>
        }
      />
      <Button
        isLoading={isSubmitting}
        color="primary"
        className="self-end w-32"
        endContent={<ArrowRightEndOnRectangleIcon className="w-4" />}
        type="submit"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};

export default SigninForm;
