import Link from "next/link";

export default function Component() {
  return (
    <section className="flex w-full flex-1 flex-col items-center justify-center py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Uh oh! This page was not found.
          </h1>
          <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            You&apos;ve hit a route that doesn&apos;t exist. Click the button
            below to return to the main page.
          </p>
        </div>
        <Link
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
          href="/"
        >
          Return Home
        </Link>
      </div>
      <img
        alt="Image"
        className="aspect-[2/1] overflow-hidden rounded-lg object-cover object-center"
        height="250"
        src="/placeholder.svg"
        width="500"
      />
    </section>
  );
}
