"use client";

import { useCurrentUser } from "@/hooks";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const user = useCurrentUser();

  return (
    <>
      <p>{JSON.stringify(user)}</p>;
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sing out
      </button>
    </>
  );
}
