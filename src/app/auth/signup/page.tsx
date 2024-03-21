import SignupForm from "@/app/components/SignupForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignupPage = () => {
  return (
    <div className="container mx-auto md:mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-5">
        <div className="md:col-span-2 flex justify-center items-center gap-5 md:mb-10">
          <p>Already have an account?</p>
          <Link className="underline text-blue-500" href="/auth/login">Login</Link>
        </div>
        <SignupForm />
        <Image src="/signup.png" width={500} height={500} alt="signup" />
      </div>
    </div>
  );
};

export default SignupPage;
