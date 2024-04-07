import JobCard from "../cards/JobCard";
import prisma from "@/lib/prisma";

export default async function JobList() {
  const jobs = await prisma.job.findMany({
    where: {
      isApproved: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section>
      {jobs.map((job) => (
        <JobCard job={job} key={job.id} />
      ))}
    </section>
  );
}
