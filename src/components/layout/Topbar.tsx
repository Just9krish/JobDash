"use client";
import Image from "next/image";
import logo from "@/assets/jobdash-logo.png";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const pathname = usePathname();

  return (
    <header className="w-full px-3 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="Jobdash" width={100} height={40} />
        </Link>
        <nav>
          {!pathname.includes("/jobs/new") && (
            <Button asChild>
              <Link href="/jobs/new">Post a job</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
