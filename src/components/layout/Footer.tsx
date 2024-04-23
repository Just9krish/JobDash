import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { getJobCategories } from "@/actions/jobCategory";

export default async function Footer() {
  const jobCategories = await getJobCategories(4);
  return (
    <footer className="w-full bg-gray-50 py-16 dark:bg-gray-800">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Find your next job
          </h2>
          <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Jobdash is the best place to find the latest job openings.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <form className="flex space-x-2">
            <Input
              className="max-w-lg flex-1"
              placeholder="Enter your email"
              type="email"
            />
            <Button type="submit">Sign Up</Button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Sign up to get notified when we launch.
            <Link className="underline underline-offset-2" href="#">
              Terms & Conditions
            </Link>
          </p>
        </div>
        <div className="space-y-4 md:space-y-0">
          <h4 className="text-lg font-semibold">Popular job categories</h4>
          <div className="flex flex-wrap gap-2">
            {jobCategories.map((category) => (
              <Link
                key={category.value}
                className="inline-flex items-center rounded-full border  border-gray-200 bg-white px-4 text-sm font-medium shadow-sm hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#"
              >
                {category.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold">Site Map</h4>
          <div className="grid gap-2">
            <Link className="underline underline-offset-2" href="#">
              About Us
            </Link>
            <Link className="underline underline-offset-2" href="#">
              Contact Us
            </Link>
            <Link className="underline underline-offset-2" href="#">
              Privacy Policy
            </Link>
            <Link className="underline underline-offset-2" href="#">
              Terms & Conditions
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 md:justify-end">
          <div className="space-y-1">
            <Image
              alt="Company"
              className="aspect-[4/1] rounded object-cover"
              height="50"
              src="/placeholder.svg"
              width="200"
            />
            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              Connect with us on social media
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center gap-4">
            <Button variant="outline">
              <FaTwitter />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="outline">
              <FaFacebook />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline">
              <FaInstagram />
              <span className="sr-only">Instagram</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
