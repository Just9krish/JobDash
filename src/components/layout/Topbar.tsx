"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks";
import RoleGate from "@/components/special/RoleGate";
import { UserRole } from "@prisma/client";
import { navigation } from "@/lib/constant";
import UserMenu from "@/components/common/UserMenu";
import logo from "@/assets/jobdash-logo.png";

export default function Topbar() {
  const pathname = usePathname();
  const user = useCurrentUser();

  const renderNavigationItems = () => {
    return (
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
    );
  };

  const renderRecruiterButton = () => {
    return (
      <RoleGate allowedRole={UserRole.RECRUITER}>
        {!pathname.includes("/jobs/new") && (
          <Button asChild>
            <Link href="/jobs/new">Post a job</Link>
          </Button>
        )}
      </RoleGate>
    );
  };

  const renderAuthenticationButtons = () => {
    if (!user) {
      return (
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign-up</Button>
          </Link>
        </div>
      );
    }
    return <UserMenu />;
  };

  return (
    <header className="w-full px-16 py-4 shadow">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="Jobdash" width={100} height={40} />
        </Link>
        <nav className="flex items-center gap-56">
          {renderNavigationItems()}
          {renderRecruiterButton()}
          {renderAuthenticationButtons()}
        </nav>
      </div>
    </header>
  );
}
