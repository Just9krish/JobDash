import NewPasswordForm from "@/components/Forms/NewPasswordForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>Reset you password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
      </CardHeader>
      <CardContent>
        <NewPasswordForm />
        <Link className="w-fullb block text-center" href="/login">
          <Button variant={"link"}>Go back to login</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
