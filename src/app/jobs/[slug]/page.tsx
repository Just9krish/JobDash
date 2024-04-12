import { getJob } from "@/actions/job.action";
import BackButton from "@/components/common/BackButton";
import JobDetails from "@/components/common/JobDetails";
import { cache } from "react";

interface PageProps {
  params: { slug: string };
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
