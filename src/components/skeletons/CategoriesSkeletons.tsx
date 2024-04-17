import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function CategoriesSkeletons() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton className="h-10 w-24 rounded-3xl" key={index}></Skeleton>
      ))}
    </>
  );
}
