"use client";
import { useCurrentRole } from "@/hooks";

export default function AdminPage() {
  const currentRole = useCurrentRole();
  return <div>Recruiter</div>;
}
