import Link from "next/link";
import BackButton from "../common/BackButton";
import { Card, CardFooter, CardHeader } from "../ui/card";

export default function ErrorCard() {
  return (
    <Card className="mx-auto max-w-sm border">
      <CardHeader>Opps! Something went wrong!</CardHeader>
      <CardFooter>
        <Link href={"/login"}>Back to login</Link>
      </CardFooter>
    </Card>
  );
}
