import { getJobs } from "@/actions/job.action";
import FilterSidebar from "@/components/common/FilterSidebar";
import JobList from "@/components/common/JobList";
import Pagination from "@/components/common/Pagination";
import { JOB_PER_PAGE } from "@/lib/constant";
import { JobFilterValues } from "@/schema/job.schema";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
}

export default async function Home({ searchParams }: PageProps) {
  const filtrValues: JobFilterValues = {
    location: searchParams.location,
    q: searchParams.q,
    type: searchParams.type,
    remote: searchParams.remote === "true",
  };
  const page = searchParams.page ? parseInt(searchParams.page) : undefined;

  const { jobs, jobsCount } = await getJobs({
    jobFilterValues: filtrValues,
    page: page,
  });

  return (
    <section>
      <div className="mb-16 space-y-5 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Find Your Next Job Here
        </h2>
        <p className="text-muted-foreground">
          Discover employment opportunities tailored to your skills and
          interests.
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <FilterSidebar filterValue={filtrValues} />

        <div className="grow space-y-4">
          <JobList jobs={jobs} />
          {jobs && jobs.length > 0 && (
            <Pagination
              currentPage={page || 1}
              totalPages={Math.ceil(jobsCount / JOB_PER_PAGE)}
              filterValues={filtrValues}
            />
          )}
        </div>
      </div>
    </section>
  );
}
