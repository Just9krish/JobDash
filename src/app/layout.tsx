import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "@/app/globals.css";
import Topbar from "@/components/layout/Topbar";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Chivo } from "next/font/google";
import { Rubik } from "next/font/google";
import Footer from "@/components/layout/Footer";

const chivo = Chivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chivo",
});
const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

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
      <html className={chivo.variable + rubik.variable} lang="en">
        <body>
          {children}

          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
