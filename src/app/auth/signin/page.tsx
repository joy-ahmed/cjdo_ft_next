import SigninForm from "@/app/components/SigninForm";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const SigninPage = () => {
  return (
    <div className="w-1/3 mx-auto mt-32">
      <Card>
        <CardHeader>
          <h1 className="text-2xl">Sign in to your account</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <SigninForm />
          <Link href="/auth/forgotpass">Forgot Password</Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default SigninPage;
