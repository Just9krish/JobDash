import { useCurrentRole } from "@/hooks";
import { UserRole } from "@prisma/client";
import React from "react";

interface RoleGateProps {
  allowedRole: UserRole;
  children: React.ReactNode;
}
export default function RoleGate({ allowedRole, children }: RoleGateProps) {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return null;
  }

  return <>{children}</>;
}
