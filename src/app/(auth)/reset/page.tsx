import ResetForm from "@/components/Forms/ResetForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function page() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address, and we will give you reset instructions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResetForm />
        <Link className="w-fullb block text-center" href="/login">
          <Button variant={"link"}>Go back to login</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
