"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Socials({ label }: { label: string }) {
  const onClickHandler = (provider: "google" | "github") => {
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
        <FcGoogle size={20} className="mr-2" />
        {label} with Google
      </Button>
    </div>
  );
}
