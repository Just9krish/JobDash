import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "@/app/globals.css";
import Topbar from "@/components/layout/Topbar";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Jobdash",
    template: "%s | Jobdash",
  },
  description: "Find your dream job",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />
          <main className="m-auto my-10 max-w-5xl space-y-5 px-3">
            {children}
          </main>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
