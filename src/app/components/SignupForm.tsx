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
import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const SignupForm = () => {
  const [isvissiblePassword, setIsVisiblePassword] = React.useState(false);
  const togglePassword = () => setIsVisiblePassword(!isvissiblePassword);
  return (
    <form className="grid grid-cols-2 border border-gray-900 shadow-md place-self-stretch rounded-md gap-3 p-4">
      <Input
        isRequired
        label="first name"
        startContent={<UserIcon className="w-4" />}
      />
      <Input
        isRequired
        label="last name"
        startContent={<UserIcon className="w-4" />}
      />
      <Input
        isRequired
        className="col-span-2"
        label="email"
        startContent={<EnvelopeIcon className="w-4" />}
      />
      <Input
        isRequired
        className="col-span-2"
        label="phone"
        startContent={<PhoneIcon className="w-4" />}
      />
      <Input
        isRequired
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
      />
      <Input
        isRequired
        className="col-span-2"
        type={isvissiblePassword ? "text" : "password"}
        label="confirm password"
        startContent={<KeyIcon className="w-4" />}
      />
      <Checkbox className="col-span-2" isRequired>
        I accept the <Link className="underline" href="#">terms and conditions</Link>
      </Checkbox>
      <div className="col-span-2 flex justify-self-end">
        <Button color="primary" className="w-48">
          Sign Up
          <PaperAirplaneIcon className="w-4" />
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
