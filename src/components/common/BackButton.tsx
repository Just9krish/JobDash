"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button variant={"outline"} onClick={() => router.back()}>
      <ChevronLeft /> Back
    </Button>
  );
}
