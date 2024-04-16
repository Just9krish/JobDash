import FilterSidebar from "@/components/common/FilterSidebar";
import JobList from "@/components/common/JobList";
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

  return (
    <>
      <div className="space-y-5 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Developer jobs
        </h2>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <FilterSidebar filterValue={filtrValues} />
        <JobList
          page={searchParams.page ? parseInt(searchParams.page) : undefined}
          filterValue={filtrValues}
        />
      </section>
    </>
  );
}
