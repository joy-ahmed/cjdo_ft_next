"use client";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SigninButton = () => {
  const { data: session } = useSession();
  return (
    <div className="flex ">
      {session && session.user ? (
        <div className="flex gap-2 items-center">
          <p>Hello👋 {session.user.firstName} </p>
          <Button
            startContent={<ArrowLeftEndOnRectangleIcon className="w-4" />}
            as={Link}
            color="warning"
            variant="flat"
            href="/api/auth/signout"
          >
            Sign out
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            startContent={<ArrowRightEndOnRectangleIcon className="w-4" />}
            as={Link}
            color="default"
            variant="flat"
            href="/api/auth/signin"
          >
            Sign in
          </Button>
          <Button as={Link} color="primary" variant="shadow"  href="/auth/signup">Signup</Button>
        </div>
      )}
    </div>
  );
};

export default SigninButton;
