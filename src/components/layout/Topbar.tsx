"use client";

import Image from "next/image";
import logo from "@/assets/jobdash-logo.png";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks";
import RoleGate from "../special/RoleGate";
import { UserRole } from "@prisma/client";
import { navigation } from "@/lib/constant";

export default function Topbar() {
  const pathname = usePathname();
  const user = useCurrentUser();

  return (
    <header className="w-full px-3 py-4 shadow">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="Jobdash" width={100} height={40} />
        </Link>
        <nav className="flex items-center gap-56">
          <ul className="flex items-center gap-2">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  className={
                    pathname === item.path
                      ? "font-bold text-primary"
                      : "text-muted-foreground hover:underline"
                  }
                  href={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <RoleGate allowedRole={UserRole.RECRUITER}>
            {!pathname.includes("/jobs/new") && (
              <Button asChild>
                <Link href="/jobs/new">Post a job</Link>
              </Button>
            )}
          </RoleGate>
          {!user && (
            <div className="flex items-center gap-2">
              <Link href={"/login"}>
                <Button variant={"outline"}>Login</Button>
              </Link>
              <Link href={"/signup"}>
                <Button>Sign-nup</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
