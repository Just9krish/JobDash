import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RegisterForm from "@/components/Forms/RegisterForm";

export default function page() {
  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Registration</CardTitle>
        <CardDescription>
          Enter your details to creat an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <RegisterForm />
          <Button className="w-full" variant="outline">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have account?
          <Link className="underline" href="/login">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}