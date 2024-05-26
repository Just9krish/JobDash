import { getJob, getStaticJobs } from "@/actions/job.action";
import BackButton from "@/components/common/BackButton";
import { notFound } from "next/navigation";
import { cache } from "react";
import prisma from "@/lib/prisma";
import JobDetails from "./_components/JobDetails";

interface PageProps {
  params: { slug: string };
}

const getStaticJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return job;
});

export async function generateStaticParams() {
  const jobs = await getStaticJobs();

  return jobs.map(({ slug }) => slug);
}

export async function generateMetadata({ params: { slug } }: PageProps) {
  const job = await getStaticJob(slug);

  return { title: job?.title };
}

export default async function page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);

  if (!job) {
    return;
  }

  return (
    <section className="space-y-8">
      <BackButton />
      <JobDetails job={job} />
    </section>
  );
}
