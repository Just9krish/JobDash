import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import Link from "next/link";
import LoginForm from "@/components/Forms/LoginForm";
import Socials from "@/components/special/Socials";

export default function page() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <LoginForm />
          <p className="text-center">Or</p>
          <Socials label="Login" />
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?
          <Link className="underline" href="/signup">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
