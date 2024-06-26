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
  return (
    <div>
      <Topbar />
      <main className="m-auto my-10 max-w-5xl space-y-5 px-3">{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
}
