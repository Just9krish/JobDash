"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ClearFilterBtn() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClearFilters = () => {
    const a = searchParams.toString();
    const params = new URLSearchParams(a);
    params.delete("q");
    params.delete("location");
    router.refresh();
  };
  return (
    <Button onClick={handleClearFilters} type="submit" variant={"link"}>
      Clear Filter
    </Button>
  );
}
