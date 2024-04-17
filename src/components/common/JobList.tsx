import { Job } from "@prisma/client";
import JobCard from "../cards/JobCard";

interface JobListProps {
  jobs: Job[];
}

export default async function JobList({ jobs }: JobListProps) {
  return (
    <div className="space-y-4">
      {jobs && jobs.length > 0 ? (
        jobs.map((job) => <JobCard job={job} key={job.id} />)
      ) : (
        <div>
          <p className="m-auto text-center">
            No jobs found. Try adjusting your search filters.
          </p>
        </div>
      )}
    </div>
  );
}
