"use client";

import { verifyToken } from "@/actions/auth.action";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Loader from "../common/Loader";
import FormSuccess from "../common/FormSuccess";
import FormError from "../common/FormError";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

export default function NewVerificationForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    console.log(token);

    if (!token) {
      return setError("Missing token!");
    }

    verifyToken(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => setError("Something went wrong!"));
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Email Verification</CardTitle>
        <CardDescription>
          Please wait while we verifying your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!success && !error && (
          <div className="w-full p-10">
            <Loader />
          </div>
        )}
        <FormSuccess message={success} />
        <FormError message={error} />
        {success && (
          <Link href="/">
            <Button variant={"link"}>To go home page</Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
