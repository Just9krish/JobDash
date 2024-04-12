import { JobFilterValues } from "@/schema/job.schema";
import JobCard from "../cards/JobCard";
import { getJobs } from "@/actions/job.action";
import Pagination from "./Pagination";
import { JOB_PER_PAGE } from "@/lib/constant";

interface JobListProps {
  filterValue: JobFilterValues;
  page?: number;
}

export default async function JobList({ filterValue, page = 1 }: JobListProps) {
  const { jobs, jobsCount } = await getJobs({
    jobFilterValues: filterValue,
    page,
  });

  return (
    <div className="grow space-y-4">
      {jobs && jobs.length > 0 ? (
        jobs.map((job) => <JobCard job={job} key={job.id} />)
      ) : (
        <div>
          <p className="m-auto text-center">
            No jobs found. Try adjusting your search filters.
          </p>
        </div>
      )}
      {jobs && jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(jobsCount / JOB_PER_PAGE)}
          filterValues={filterValue}
        />
      )}
    </div>
  );
}
