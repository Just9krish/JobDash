"use client";

import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedinIn } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Socials() {
  const onClickHandler = (provider: "google" | "linkedin") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full items-center gap-2">
      <Button
        onClick={() => onClickHandler("google")}
        className="w-full"
        variant={"outline"}
        size={"lg"}
      >
        <FcGoogle />
      </Button>
      <Button
        onClick={() => onClickHandler("linkedin")}
        className="w-full"
        variant={"outline"}
        size={"lg"}
      >
        <FaLinkedinIn />
      </Button>
    </div>
  );
}
